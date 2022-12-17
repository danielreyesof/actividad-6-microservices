import mongoose from 'mongoose';
import config from './config';

export const connect = async () => {
  await mongoose
    .set('strictQuery', false)
    .connect(config.host_name!)
    .then(() => console.log('✅ Connected to database'))
    .catch((error) => console.error('❌ Error connecting to the database', error.message));
};
