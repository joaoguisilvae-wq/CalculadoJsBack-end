import { MakeCalculation } from "../usecases/MakeCalculation";

interface HandleInput {
  expression: string;
  userId: string;
  angleMode: "deg" | "rad";
}

export class CalculationController {
  private useCase = new MakeCalculation();

  public async handle(input: HandleInput) {
    return this.useCase.execute(input);
  }
}
