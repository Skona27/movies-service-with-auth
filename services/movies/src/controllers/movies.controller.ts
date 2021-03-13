import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller()
export class MoviesController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('/movies')
  getMovies(): string {
    return 'Unprotected - Hello World!';
  }

  @UseGuards(JwtAuthGuard)
  @Post('/movies')
  createMovie(): string {
    return 'Protected - Hello World!';
  }
}
