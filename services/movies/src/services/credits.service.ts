import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PublicCreditDTO } from '../models/credit.model';

@Injectable()
export class CreditsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, movieId: number): Promise<PublicCreditDTO> {
    const { id, createdAt } = await this.prisma.credit.create({
      data: {
        movieId,
        userId,
      },
    });

    return { id, createdAt };
  }

  async findMonthlyCount(userId): Promise<number> {
    const month = this.getMonthlyTimePeriod();
    const count = await this.prisma.credit.count({
      where: {
        userId,
        createdAt: {
          gte: month.firstDay,
          lte: month.lastDay,
        },
      },
    });

    return count;
  }

  private getMonthlyTimePeriod() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return { firstDay, lastDay };
  }
}
