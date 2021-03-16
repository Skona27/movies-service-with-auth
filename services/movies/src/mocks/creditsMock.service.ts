import { Injectable } from '@nestjs/common';
import { ICreditsService } from '../services/credits.service';
import { PublicCreditDTO } from '../models/credit.model';

@Injectable()
export class CreditsServiceMock implements ICreditsService {
  private readonly credit: PublicCreditDTO = {
    id: 1,
    createdAt: new Date(),
  };

  async create(userId: number, movieId: number) {
    return this.credit;
  }

  async findMonthlyCount(userId: number) {
    return 0;
  }
}
