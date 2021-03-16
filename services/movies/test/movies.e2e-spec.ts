import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import { MoviesModule } from '../src/modules/movies.module';
import { MoviesService } from '../src/services/movies.service';
import { MoviesServiceMock } from '../src/mocks/moviesMock.service';
import { User } from '../src/modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from '../src/config/config';
import { Config } from '../src/config/config.interface';
import { JwtAuthGuard } from '../src/guards/jwt-auth.guard';
import { AuthModule } from '../src/modules/auth.module';

describe('Movies', () => {
  let app: INestApplication;
  let moviesService = new MoviesServiceMock();

  const user: User = {
    id: 1,
    role: 'basic',
    name: 'Jakub',
    username: 'Skona27',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        MoviesModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            (): Config => ({
              ...config,
              nest: {
                jwt: 'test-token',
                port: config.nest.port,
              },
            }),
          ],
        }),
      ],
    })
      .overrideProvider(MoviesService)
      .useValue(moviesService)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = user;
          return true;
        },
      })
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it(`/GET movies`, async () => {
    const data = await moviesService.findAll(user.id);

    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect(data);
  });

  afterAll(async () => {
    await app.close();
  });
});
