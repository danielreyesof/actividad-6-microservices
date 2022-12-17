import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicatedUsernameOrEmail = async (
  req: { body: { username: any; email: any } },
  res: any,
  next: any
) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ status: 400, message: `The username already exists` });

  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ status: 400, message: `The email already exists` });

  next();
};

export const checkRolesExisted = (req: { body: { roles: string | any[] } }, res: any, next: any) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      const element = req.body.roles[i];
      if (!ROLES.includes(element)) {
        return res.status(400).json({
          message: `Role ${element} does not exists`,
        });
      }
    }
  }

  next();
};
