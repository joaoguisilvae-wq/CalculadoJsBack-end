import "dotenv/config";

import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";
import Fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { homeRoutes } from "./routes/home.js";
import { calculationRoutes } from "./routes/Calculator.js";
import { conversorsRoutes } from "./routes/Conversors.js";

const app = Fastify({ logger: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Calculator API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifyCors, {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "https://calculadora-silk-gamma.vercel.app/",
  ],
  credentials: true,
});

await app.register(fastifyApiReference, {
  routePrefix: "/docs",
  configuration: {
    sources: [
      {
        title: "Calculator API",
        url: "/swagger.json",
      },
    ],
  },
});

await app.register(homeRoutes, { prefix: "/home" });
await app.register(calculationRoutes, { prefix: "/calculation" });
await app.register(await conversorsRoutes, { prefix: "/conversors" });

app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/swagger.json",
  handler: async () => app.swagger(),
});

await app.listen({ port: Number(process.env.PORT) || 8080 });
