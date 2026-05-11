import { prisma } from "../lib/db";

type GetCalculationsByUserIdInput = {
  userId: string;
};

type GetCalculationsByUserIdOutput = {
  operations: {
    id: number;
    result: number;
    expression: string;
    createdAt: Date;
  }[];
  total: number;
};

export class GetCalculationByUserId {
  public async execute(
    input: GetCalculationsByUserIdInput,
  ): Promise<GetCalculationsByUserIdOutput> {
    const { userId } = input;

    const [operations, total] = await Promise.all([
      prisma.operation.findMany({
        where: { userId, isActive: false },
        orderBy: { createdAt: "desc" },
      }),
      prisma.operation.count({
        where: { userId, isActive: false },
      }),
    ]);

    return { operations, total };
  }
}
