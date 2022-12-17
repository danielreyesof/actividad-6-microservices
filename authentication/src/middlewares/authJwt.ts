import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';
import blTokens from '../models/BlacklistToken';

interface JwtPayload {
  id: any;
}

export const verifyToken = async (req: any, res: any) => {
  try {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ status: 403, message: 'No token provided' });

    const blListed = await blTokens.findOne({ token });

    if (blListed) return res.status(403).json({ status: 403, message: 'This session does not exist' });

    const decoded = jwt.verify(token, config.secret!) as JwtPayload;
    req.user_id = decoded.id;

    const user = await User.findById(req.user_id, { password: 0 });
    if (!user) return res.status(403).json({ message: 'No user found' });

    return res.status(200).json({ status: 200, message: 'Authorized', user });
  } catch (error: any) {
    return res.status(401).json({ status: 401, message: `Unauthorized ${error.message}` });
  }
};
