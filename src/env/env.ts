import * as dotenv from 'dotenv';
import * as path   from 'path';

export const getEnv = () => {
  const client  = process.env.ENV || 'demoqa';
  const envFile = path.resolve(__dirname, `.env.${client}`);
  dotenv.config({ path: envFile });
  console.log(`🌍 Loaded env: .env.${client}`);
  console.log(`🔗 BASEURL: ${process.env.BASEURL}`);
};