import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PublicEditableDTO } from './base.model';

export class CreateMovieDTO {
  @ApiProperty()
  @IsString()
  title: string;
}

export class PublicMovieDTO extends PublicEditableDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  released: string;

  @ApiProperty()
  @IsString()
  genre: string;

  @ApiProperty()
  @IsString()
  directory: string;
}
