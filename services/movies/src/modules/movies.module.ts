import { Module } from '@nestjs/common';
import { MoviesController } from '../controllers/movies.controller';
import { MoviesService } from '../services/movies.service';
// import { PrismaService } from '../services/prisma.service';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
