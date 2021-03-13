export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  omdb: OmdbConfig;
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
