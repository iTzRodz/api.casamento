import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { subscribeToEventRoute } from "./routes/form-route";
import { pingRoute } from "./routes/ping";
import { pingRouteDB } from "./routes/ping-db";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifyCors);

app.register(subscribeToEventRoute);
app.register(pingRoute);
app.register(pingRouteDB);

app.get("/is-alive", async () => {
  return { message: "ok" };
});

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen({ port: PORT, host: HOST }).then(() => {
  console.log(`Server ON - Port: ${PORT}`);
});