import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomError } from '../errors/errors';
import { OmdbConfig } from '../config/config.interface';

interface OmdbMovie {
  Title: string;
  Year: string;
  Released: string;
  Genre: string;
  Director: string;
}

@Injectable()
export class OmdbService {
  private readonly url: string;

  constructor(private readonly configService: ConfigService) {
    const { apiKey, baseUrl } = configService.get<OmdbConfig>('omdb');
    this.url = `${baseUrl}?apiKey=${apiKey}`;
  }

  async fetchMovieByTitle(title: string): Promise<OmdbMovie> {
    try {
      const url = `${this.url}&t=${title}`;
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      throw new CustomError({
        type: 'OMDB_API',
        message: 'Failed to fetch movie by title',
        extra: {
          title,
        },
      });
    }
  }
}
