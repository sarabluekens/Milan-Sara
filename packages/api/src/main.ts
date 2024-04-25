import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3001',
      'http://0.0.0.0:3004',

      // dit moet weg
      'http://192.168.99.204:5173',
      'http://192.168.99.204:8081',

      process.env.URL_FRONTEND,
      //   //staging/TEST
      //   https://staging-redCross.be,

      //   //PRODUCTION
      //   http://redCross.be,
    ],
    credentials: true,
  }) //<- enable cors for all requests with the right credentials

  //validatie voor alle requests (validationpipe)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3001)
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`GraphQL is running on: ${await app.getUrl()}/graphql`)
  console.info(`Websocket is running on port: ${process.env.WS_PORT || 3004}`)
}
bootstrap()
