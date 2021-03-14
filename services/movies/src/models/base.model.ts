import { IsOptional, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PublicBaseDTO {
  @ApiProperty()
  @IsNumber({})
  id: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}

export class PublicEditableDTO extends PublicBaseDTO {
  @ApiProperty()
  @IsDate()
  modifiedAt?: Date;
}
