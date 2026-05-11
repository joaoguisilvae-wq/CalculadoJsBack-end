import { prisma } from "../lib/db";

type getConversorsUnitsInput = {
  conversionTypeId: number;
};

type GetConversorsUnitsOutput = {
  unit: string;
  label: string;
  rate: number;
};

export class GetAllConversorsUnits {
  public async execute(
    input: getConversorsUnitsInput,
  ): Promise<GetConversorsUnitsOutput[]> {
    const { conversionTypeId } = input;
    const conversionUnits = await prisma.conversionUnit.findMany({
      where: { conversionTypeId },
      orderBy: { createdAt: "desc" },
    });
    return conversionUnits.map((u) => ({
      unit: u.unit,
      label: u.label,
      rate: u.rate,
    }));
  }
}
