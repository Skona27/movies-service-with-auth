import { Injectable } from '@nestjs/common';
import { CreateMovieDTO, PublicMovieDTO } from '../models/movie.model';
import { PrismaService } from './prisma.service';
import { OmdbService } from './omdb.service';

export interface IMoviesService {
  create(userId: number, movieDto: CreateMovieDTO): Promise<PublicMovieDTO>;
  findAll(userId: number): Promise<PublicMovieDTO[]>;
}

@Injectable()
export class MoviesService implements IMoviesService {
  constructor(
    private prisma: PrismaService,
    private omdbService: OmdbService,
  ) {}

  async create(
    userId: number,
    movieDto: CreateMovieDTO,
  ): Promise<PublicMovieDTO> {
    const movie = await this.omdbService.fetchMovieByTitle(movieDto.title);

    const { userId: _, ...publicData } = await this.prisma.movie.create({
      data: {
        userId,
        title: movie.Title,
        released: movie.Released,
        genre: movie.Genre,
        directory: movie.Director,
      },
    });

    return publicData;
  }

  async findAll(userId: number): Promise<PublicMovieDTO[]> {
    const data = await this.prisma.movie.findMany({
      where: {
        userId,
      },
    });

    return data.map(({ userId, ...publicData }) => {
      return publicData;
    });
  }
}
