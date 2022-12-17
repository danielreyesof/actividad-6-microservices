import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 4000,
  host_name: process.env.DBCONNECT,
  secret: process.env.JWT_TOKEN_SECRET,
};
