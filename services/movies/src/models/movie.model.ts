import { PublicEditableDTO } from './base.model';

export class CreateMovieDTO {
  title: string;
}

export class PublicMovieDTO extends PublicEditableDTO {
  title: string;
  released: string;
  genre: string;
  directory: string;
}
