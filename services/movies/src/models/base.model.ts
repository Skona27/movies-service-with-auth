export class PublicBaseDTO {
  id: number;
  createdAt: Date;
}

export class PublicEditableDTO extends PublicBaseDTO {
  modifiedAt?: Date;
}
