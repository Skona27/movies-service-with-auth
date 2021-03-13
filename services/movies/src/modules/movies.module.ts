import { Module } from '@nestjs/common';
import { MoviesController } from '../controllers/movies.controller';
import { MoviesService } from '../services/movies.service';
import { PrismaService } from '../services/prisma.service';
import { OmdbService } from '../services/omdb.service';

@Module({
  providers: [MoviesService, PrismaService, OmdbService],
  controllers: [MoviesController],
})
export class MoviesModule {}
