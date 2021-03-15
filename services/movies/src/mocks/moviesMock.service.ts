import { Injectable } from '@nestjs/common';
import { IMoviesService } from '../services/movies.service';
import { PublicMovieDTO, CreateMovieDTO } from '../models/movie.model';

@Injectable()
export class MoviesServiceMock implements IMoviesService {
  private readonly movie: PublicMovieDTO = {
    id: 1,
    title: 'Godfather',
    genre: 'Crime',
    released: '24 March 1972',
    directory: 'Francis Ford Coppola',
    createdAt: new Date(),
  };

  async create(
    userId: number,
    movieDto: CreateMovieDTO,
  ): Promise<PublicMovieDTO> {
    return this.movie;
  }

  async findAll(userId: number): Promise<PublicMovieDTO[]> {
    return [this.movie];
  }
}
