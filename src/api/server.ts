import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { subscribeToEventRoute } from "./routes/form-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifyCors);

app.register(subscribeToEventRoute);


app.get("/is-alive", async () => {
  return { message: "ok" };
});


app.listen({ port: 3000 }).then(() => {
  console.log("Server ON");
});