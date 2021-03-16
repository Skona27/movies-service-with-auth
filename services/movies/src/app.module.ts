import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config/config';
import { AuthModule } from './modules/auth.module';
import { MoviesModule } from './modules/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getConfig] }),
    AuthModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
