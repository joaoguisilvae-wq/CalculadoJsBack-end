import { GetCalculation } from "../usecases/GetCalculation";

interface HandleInput {
  expression: string;
  userId: string;
  angleMode: "deg" | "rad";
}

export class CalculationController {
  private useCase = new GetCalculation();

  public async handle(input: HandleInput) {
    return this.useCase.execute(input);
  }
}
