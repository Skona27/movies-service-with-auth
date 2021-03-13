import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PublicMovieDTO, CreateMovieDTO } from '../models/movie.model';
import { User } from '../modules/auth.module';
import { MoviesService } from '../services/movies.service';

@Controller()
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/movies')
  getMovies(@Request() req): Promise<PublicMovieDTO[]> {
    const user: User = req.user;
    return this.moviesService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/movies')
  createMovie(
    @Request() req,
    @Body() createMovieDto: CreateMovieDTO,
  ): Promise<PublicMovieDTO> {
    const user: User = req.user;
    return this.moviesService.create(user, createMovieDto);
  }
}
