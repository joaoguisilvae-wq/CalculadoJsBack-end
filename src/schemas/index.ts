import { z } from "zod";

export const ErrorSchema = z.object({
  error: z.string(),
  code: z.string(),
});

export const YourResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  // ... seus schemas
});
