import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestConfig } from '../config/config.interface';

export interface User {
  id: number;
  role: 'basic' | 'premium';
  name: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<NestConfig>('nest').jwt,
    });
  }

  async validate(payload: any): Promise<User> {
    return {
      id: parseFloat(payload.sub),
      role: payload.role,
      name: payload.name,
      username: payload.username,
    };
  }
}

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<NestConfig>('nest').jwt,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule {}
