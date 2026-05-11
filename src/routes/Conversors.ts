import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { GetAllConversors } from "../usecases/GetConversor";
import { GetAllConversorsUnits } from "../usecases/GetConversorsUnits";

export const conversorsRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/getConversors",
    schema: {
      tags: ["Conversors"],
      response: {
        200: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            label: z.string(),
          }),
        ),
      },
    },
    handler: async (request, reply) => {
      const useCase = new GetAllConversors();
      const result = await useCase.execute();
      return reply.status(200).send(result);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/getConversorsUnits",
    schema: {
      tags: ["Conversors"],
      querystring: z.object({
        conversionTypeId: z.number(),
      }),
      response: {
        200: z.array(
          z.object({
            unit: z.string(),
            label: z.string(),
            rate: z.number(),
          }),
        ),
      },
    },
    handler: async (request, reply) => {
      const { conversionTypeId } = request.query;
      const useCase = new GetAllConversorsUnits();
      const result = await useCase.execute({ conversionTypeId });
      return reply.status(200).send(result);
    },
  });
};
