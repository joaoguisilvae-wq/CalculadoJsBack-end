import { prisma } from "../lib/db";

const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

const autoCloseParentheses = (expr: string): string => {
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  return expr + ")".repeat(Math.max(0, open - close));
};

const addImplicitMultiplication = (expr: string): string => {
  expr = expr.replace(/(\d|\))\s*([πe])/g, "$1*$2");
  expr = expr.replace(
    /(\d|\))\s*(sin|cos|tan|asin|acos|atan|lg|ln|√)/g,
    "$1*$2",
  );
  expr = expr.replace(/([πe])\s*\(/g, "$1*(");
  expr = expr.replace(/\)\s*(\d)/g, ")*$1");
  expr = expr.replace(/\)\s*\(/g, ")*(");
  return expr;
};

const evaluateExpression = (
  expression: string,
  angleMode: "deg" | "rad",
): number => {
  let expr = expression.replace(/\s+/g, "");

  expr = autoCloseParentheses(expr);
  expr = addImplicitMultiplication(expr);

  expr = expr.replace(/π/g, "Math.PI");
  expr = expr.replace(/\be\b/g, "Math.E");

  if (angleMode === "deg") {
    expr = expr.replace(/sin\(([^)]+)\)/g, "Math.sin(($1)*Math.PI/180)");
    expr = expr.replace(/cos\(([^)]+)\)/g, "Math.cos(($1)*Math.PI/180)");
    expr = expr.replace(/tan\(([^)]+)\)/g, "Math.tan(($1)*Math.PI/180)");
    expr = expr.replace(/asin\(([^)]+)\)/g, "(Math.asin($1)*180/Math.PI)");
    expr = expr.replace(/acos\(([^)]+)\)/g, "(Math.acos($1)*180/Math.PI)");
    expr = expr.replace(/atan\(([^)]+)\)/g, "(Math.atan($1)*180/Math.PI)");
  } else {
    expr = expr.replace(/sin\(/g, "Math.sin(");
    expr = expr.replace(/cos\(/g, "Math.cos(");
    expr = expr.replace(/tan\(/g, "Math.tan(");
    expr = expr.replace(/asin\(/g, "Math.asin(");
    expr = expr.replace(/acos\(/g, "Math.acos(");
    expr = expr.replace(/atan\(/g, "Math.atan(");
  }

  expr = expr.replace(/lg\(/g, "Math.log10(");
  expr = expr.replace(/ln\(/g, "Math.log(");
  expr = expr.replace(/√\(/g, "Math.sqrt(");
  expr = expr.replace(/\^/g, "**");
  expr = expr.replace(/(\d+)!/g, "factorial($1)");
  expr = expr.replace(/(-?[\d.]+)%/g, "($1/100)");

  try {
    const result = new Function(
      "factorial",
      "Math",
      `"use strict"; return ${expr}`,
    )(factorial, Math);

    if (typeof result !== "number" || !isFinite(result)) {
      throw new Error("Expressão inválida");
    }

    return result;
  } catch {
    throw new Error("Expressão inválida");
  }
};

const extractPrimarySymbol = (expression: string): string => {
  if (/asin|acos|atan/.test(expression)) return "arc-trig";
  if (/sin|cos|tan/.test(expression)) return "trig";
  if (/lg|ln/.test(expression)) return "log";
  if (/√/.test(expression)) return "sqrt";
  if (/\^/.test(expression)) return "pow";
  if (/!/.test(expression)) return "factorial";
  if (/\+/.test(expression)) return "+";
  if (/-/.test(expression)) return "-";
  if (/\*/.test(expression)) return "*";
  if (/\//.test(expression)) return "/";
  return "unknown";
};

export interface GetCalculationInput {
  expression: string;
  userId: string;
  angleMode: "deg" | "rad";
}

export interface GetCalculationOutput {
  result: number;
  id: number;
}

export class GetCalculation {
  public async execute(
    input: GetCalculationInput,
  ): Promise<GetCalculationOutput> {
    const { expression, userId, angleMode } = input;

    const result = evaluateExpression(expression, angleMode);
    const symbol = extractPrimarySymbol(expression);

    const existingOperation = await prisma.operation.findFirst({
      where: { userId, symbol, isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return prisma.$transaction(async (tx) => {
      if (existingOperation) {
        await tx.operation.update({
          where: { id: existingOperation.id },
          data: { isActive: false },
        });
      }

      const newOperation = await tx.operation.create({
        data: {
          userId,
          expression,
          symbol,
          result,
          isActive: true,
        },
      });

      return { result, id: newOperation.id };
    });
  }
}
