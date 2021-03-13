import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';
import { NestConfig } from 'src/config/config.interface';
import { ConfigService } from '@nestjs/config';

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
