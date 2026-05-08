// src/routes/calculation.routes.ts
import { z } from "zod";
import { MakeCalculation } from "../usecases/MakeCalculation";
import { GetCalculationByUserId } from "../usecases/GetCalculation";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export const calculationRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/makeCalc",
    schema: {
      tags: ["Calculations"],
      body: z.object({
        expression: z.string().min(1),
        userId: z.string().min(1),
        angleMode: z.enum(["deg", "rad"]).default("deg"),
      }),
      response: {
        200: z.object({
          result: z.number(),
          id: z.number(),
        }),
        422: z.object({
          error: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { expression, userId, angleMode } = request.body;

      try {
        const useCase = new MakeCalculation();
        const result = await useCase.execute({ expression, userId, angleMode });

        return reply.status(200).send(result);
      } catch (error) {
        if (error instanceof Error && error.message === "Expressão inválida") {
          return reply.status(422).send({ error: error.message });
        }

        throw error;
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/getCalculations",
    schema: {
      tags: ["Calculations"],
      querystring: z.object({
        userId: z.string().uuid(),
      }),
      response: {
        200: z.array(
          z.object({
            result: z.number(),
            id: z.number(),
            expression: z.string(),
            createdAt: z.date(),
          }),
        ),
        404: z.object({
          error: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { userId } = request.query;

      try {
        const useCase = new GetCalculationByUserId();
        const result = await useCase.execute({ userId });

        if (!result.total) {
          return reply.status(404).send({ error: "Cálculos não encontrados" });
        }

        return reply.status(200).send(result.operations);
      } catch (error) {
        throw error;
      }
    },
  });
};
