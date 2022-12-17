import { config } from 'dotenv';
config();

export default {
  host_name: process.env.DBCONNECT,
  secret: process.env.JWT_TOKEN_SECRET,
};
