import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { routes } from '../routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler) //seta o zod para validar os dados de entrada

app.setSerializerCompiler(serializerCompiler) //seta o zod para serialização dos dados de saida

app.register(fastifyCors, { origin: '*'}) // permite que qualquer domínio acesse a API

app.register(fastifySwagger, {    // cria um registro swagger para documentar a API
    openapi: {
        info: {
            title: 'type API',
            version: '1.0.0',
        }
    },
    transform: jsonSchemaTransform,  //pre visualização do schema
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',       // padrão de rota 
})
 
app.register(routes)

app.listen({ port: 3333}).then(() => {  //criação do servidor porta 3333
    console.log("HTTP server running!")
})