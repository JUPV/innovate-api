import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function usuariosRoutes(app: FastifyInstance) {
  app.post('/user', register)
}
