import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { invalidConversorIdError } from "../errors";
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
        conversionTypeId: z.coerce.number().int(),
      }),
      response: {
        200: z.array(
          z.object({
            unit: z.string(),
            label: z.string(),
            rate: z.number(),
          }),
        ),
        400: z.object({
          errorStatus: z.number(),
          error: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      try {
        const { conversionTypeId } = request.query;
        const useCase = new GetAllConversorsUnits();
        const result = await useCase.execute({ conversionTypeId });
        return reply.status(200).send(result);
      } catch (error) {
        if (error instanceof invalidConversorIdError) {
          return reply
            .status(400)
            .send({ errorStatus: 400, error: error.message });
        }
        throw error;
      }
    },
  });
};
