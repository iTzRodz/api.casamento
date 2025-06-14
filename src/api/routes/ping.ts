import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib'

export async function pingRoute(app: FastifyInstance) {
  app.get('/ping', async (request, reply) => {
    try {
      await prisma.person.findFirst({ select: { id: true } })
      return reply.send({ ok: true })
    } catch (err) {
      console.error('Erro no ping:', err)
      return reply.status(500).send({ ok: false, error: 'Erro no ping' })
    }
  })
}
