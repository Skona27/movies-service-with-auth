import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Unprotected - Hello World!';
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  getProtectedHello(): string {
    return 'Protected - Hello World!';
  }
}
