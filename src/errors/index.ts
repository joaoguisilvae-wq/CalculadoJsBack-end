export class notFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class invalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

export class invalidConversorIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidConversorIdError";
  }
}
