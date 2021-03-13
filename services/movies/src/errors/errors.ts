interface Params {
  message: string;
  type: string;
  extra?: any;
}

export class CustomError extends Error {
  public readonly type: string;
  public readonly extra: string;

  constructor(params: Params) {
    super(params.message);
    this.type = params.type;
    this.extra = params.extra;
  }
}
