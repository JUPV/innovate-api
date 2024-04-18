import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  console.log('chegou 2024')

  const registerBodySchema = z.object({
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    nivelAcesso: z.string(),
  })
  console.log('chegou 2024 2', request.body)

  const { name, email, last_name, nivelAcesso } =
    registerBodySchema.parse(request.body)
  console.log('chegou 2024 3')

  const password = '123456'
  try {
   
    reply.status(200).send()
  } catch (err) {
   
    throw err
  }
  return reply.status(201).send()
}
