import { FastifyInstance } from 'fastify'

export async function pingRoute(app: FastifyInstance) {
  app.get('/ping', async (request, reply) => {
    try {
      return reply.send({ ok: true, timestamp: new Date().toISOString() })
    } catch (err) {
      console.error('Erro no ping:', err)
      return reply.status(500).send({ ok: false, error: 'Erro no ping' })
    }
  })
}
