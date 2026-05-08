import { prisma } from "../lib/db";

type GetConversorsOutput = {
  id: number;
  name: string;
  label: string;
};

export class GetAllConversors {
  public async execute(): Promise<GetConversorsOutput[]> {
    return prisma.conversionType.findMany({
      orderBy: { name: "asc" },
    });
  }
}
