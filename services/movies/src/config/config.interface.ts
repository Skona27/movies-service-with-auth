import { UserRole } from '../modules/auth.module';

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  omdb: OmdbConfig;
  credits: CreditsConfig;
  swagger: SwaggerConfig;
}

export interface NestConfig {
  port: string | number;
  jwt: string;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface OmdbConfig {
  baseUrl: string;
  apiKey: string;
}

export type CreditsConfig = Record<UserRole, number>;

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}
