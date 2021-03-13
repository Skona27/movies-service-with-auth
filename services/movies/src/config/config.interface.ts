export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
}

export interface NestConfig {
  port: string | number;
  jwt: string;
}

export interface CorsConfig {
  enabled: boolean;
}
