import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './config/config.interface';
import { PublicMovieDTO } from './models/movie.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  if (corsConfig.enabled) {
    app.enableCors();
  }

  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      })
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      extraModels: [PublicMovieDTO],
    });
    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  await app.listen(nestConfig.port);
}
bootstrap();
