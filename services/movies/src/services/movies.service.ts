import { Injectable } from '@nestjs/common';
import { CreateMovieDTO, PublicMovieDTO } from '../models/movie.model';
import { User } from '../modules/auth.module';
import { PrismaService } from './prisma.service';
import { OmdbService } from './omdb.service';

@Injectable()
export class MoviesService {
  constructor(
    private prisma: PrismaService,
    private omdbService: OmdbService,
  ) {}

  async create(user: User, movieDto: CreateMovieDTO): Promise<PublicMovieDTO> {
    const movie = await this.omdbService.fetchMovieByTitle(movieDto.title);

    const { userId, ...publicData } = await this.prisma.movie.create({
      data: {
        title: movie.Title,
        released: movie.Released,
        genre: movie.Genre,
        directory: movie.Director,
        userId: user.id,
      },
    });

    return publicData;
  }

  async findAll(user: User): Promise<PublicMovieDTO[]> {
    const data = await this.prisma.movie.findMany({
      where: {
        userId: user.id,
      },
    });

    return data.map(({ userId, ...publicData }) => {
      return publicData;
    });
  }
}
