import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { string, z } from "zod";
import { respondToWeddingInvite } from "../controller/form-controler";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/form",
    {
      schema: {
        body: z.object({
          isGoToEvent: z.enum(["1", "0"]),
          phone: z.string().min(1),
          name: z.string().min(1),
          adultCount: z.number(),
          childCount: z.number(),
          adultHouseHold: z.object({
            count: z.number(),
            names: z.array(z.string()).optional(),
          }),
        }),
        response: {
          201: z.object({
            message: string(),
          }),
          400: z.object({
            message: string(),
          }),
          500: z.object({
            message: string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { message, status } = await respondToWeddingInvite(request.body);
        if (status === 201) {
          return reply.status(201).send({ message });
        } else {
          return reply.status(400).send({ message });
        }
      } catch (error) {
        console.error("Error processing form submission:", error);
        return reply.status(500).send({ message: "Internal Server Error" });
      }
    },
  );
};
