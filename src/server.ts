import fastify, { FastifyInstance } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastiCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from './env'
import cors from '@fastify/cors'
import path from 'path'
import { Server, IncomingMessage, ServerResponse } from 'http'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(
  {}
)

// Adicione o middleware Fastify CORS
app.register(cors, {
  origin: true,
  credentials: true,
  allowedHeaders: ['content-type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: true,
  },
  sign: {
    expiresIn: '7d',
  },
})

app.register(fastiCookie)

app.register(require('@fastify/multipart'))

const documentosPath = path.resolve(__dirname, '../images')

// Configurar o Fastify para servir arquivos estáticos
app.register(require('@fastify/static'), {
  root: documentosPath,
  prefix: '/images', // Rota prefixo para acessar os arquivos estáticos
})


app.get('/', async () => {
  console.log('Usuário conectado:')
  return 'teste'
})


app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ massage: 'Validation erro.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // enviar o erro para um apricativo de alerta ex: DataDog/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})

app.listen({ port: 3001, host: '0.0.0.0' }, () => {
  console.log('server online na porta 3001')
})
