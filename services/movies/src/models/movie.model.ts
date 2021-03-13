import { PublicBaseDTO } from './base.model';

export class CreateMovieDTO {
  title: string;
}

export class PublicMovieDTO extends PublicBaseDTO {
  title: string;
  released: string;
  genre: string;
  directory: string;
}
