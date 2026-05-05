import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const homeRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Home"],
      response: {
        200: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      return { message: "Hello world" };
    },
  });
};
