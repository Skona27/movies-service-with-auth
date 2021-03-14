import * as dotenv from 'dotenv';
import { Config } from './config.interface';

dotenv.config();

const config: Config = {
  nest: {
    port: process.env.PORT || 3000,
    jwt: process.env.JWT_SECRET,
  },
  cors: {
    enabled: true,
  },
  omdb: {
    baseUrl: process.env.OMDB_API_URL,
    apiKey: process.env.OMDB_API_KEY,
  },
  credits: {
    basic: 5,
    premium: Infinity,
  },
  swagger: {
    enabled: true,
    title: 'MoviesService',
    description: 'The NestJS API description',
    version: '1.0',
    path: 'api',
  },
};

export default (): Config => config;
