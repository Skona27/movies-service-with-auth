import * as dotenv from 'dotenv';
import { Config } from './config.interface';

dotenv.config();

const config: Config = {
  nest: {
    port: process.env.PORT || 3000,
    jwt: process.env.JWT_SECRET || 'abc',
  },
  cors: {
    enabled: true,
  },
};

export default (): Config => config;
