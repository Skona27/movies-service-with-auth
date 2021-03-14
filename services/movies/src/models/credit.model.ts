import { PublicBaseDTO } from '../models/base.model';

export class CreateCreditDTO {
  userId: number;
  movieId: number;
}

export class PublicCreditDTO extends PublicBaseDTO {}
