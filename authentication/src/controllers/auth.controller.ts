import User, { encryptPassword, comparePassword } from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import config from '../config';
import BlToken from '../models/BlacklistToken';
import { UserCreate } from '../types';

export const signup = async (req: any, res: any) => {
  const { name, username, email, email_verified_at, password, imgURL, platform, push_token, roles } = req.body;

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(email)) return res.status(400).json({ message: 'Correo electronico invalido.' });

  const newUser = new User({
    name,
    username,
    email,
    email_verified_at,
    imgURL,
    platform,
    push_token,
    password: await encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: 'user' });
    newUser.roles = [role!._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.secret!, {
    expiresIn: 86400,
  });

  res.status(200).json({ status: 201, token, message: 'Usuario creado correctamente.' });
};

export const signin = async (req: any, res: any) => {
  const userFound = await User.findOne({ email: req.body.email }).populate('roles');

  if (!userFound) return res.status(400).json({ message: 'Correo electrónico o contraseña incorrecta.' });

  const matchPassword = await comparePassword(req.body.password, userFound.password);

  if (!matchPassword)
    return res.status(401).json({ token: null, message: 'Correo electrónico o contraseña incorrecta.' });

  const token = jwt.sign({ id: userFound._id }, config.secret!, {
    expiresIn: 86400,
  });

  res.status(200).json({ status: 200, token });
};

export const logout = async (req: { headers: { [x: string]: any } }, res: any) => {
  const token = req.headers['authorization'];

  const newBlToken = new BlToken({
    token,
  });

  await newBlToken.save();

  res.status(200).json({ status: 200, message: 'Sesión terminada correctamente.' });
};
