import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '../config/config';
import { MoviesController } from './movies.controller';
import { MoviesService } from '../services/movies.service';
import { MoviesServiceMock } from '../mocks/moviesMock.service';
import { CreditsService } from '../services/credits.service';
import { CreditsServiceMock } from '../mocks/creditsMock.service';
import { User } from '../modules/auth.module';

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;
  let creditsService: CreditsService;

  const user: User = {
    id: 1,
    role: 'basic',
    name: 'Jakub',
    username: 'Skona27',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      imports: [ConfigModule.forRoot({ isGlobal: true, load: [getConfig] })],
      providers: [
        {
          provide: MoviesService,
          useClass: MoviesServiceMock,
        },
        {
          provide: CreditsService,
          useClass: CreditsServiceMock,
        },
      ],
    }).compile();

    moviesController = app.get<MoviesController>(MoviesController);
    moviesService = app.get<MoviesService>(MoviesService);
    creditsService = app.get<CreditsService>(CreditsService);
  });

  describe('getMovies', () => {
    it('should return an array of movies', async () => {
      const response = await moviesController.getMovies({
        user,
      });

      expect(response.length).toBe(1);
    });
  });

  describe('createMovie', () => {
    it('should create new movie based on title', async () => {
      const response = await moviesController.createMovie(
        { user },
        { title: 'Godfather' },
      );

      expect(response.title).toBe('Godfather');
    });

    it('should return error if user has used up all credits', async done => {
      jest
        .spyOn(creditsService, 'findMonthlyCount')
        .mockImplementation(async () => 10);

      try {
        await moviesController.createMovie({ user }, { title: 'Godfather' });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        done();
      }
    });
  });
});
