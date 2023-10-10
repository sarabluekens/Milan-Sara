import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:5173',

    // origin:
    // [
    //   http://localhost:5173,
    //   http://127.0.0.1:5173,

    //   //staging/TEST
    //   https://staging-redCross.be,

    //   //PRODUCTION
    //   http://redCross.be,
    // ]
    credentials: true,
  }) //<- enable cors for all requests with the right credentials

  //validatie voor alle requests (validationpipe)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`GraphQL is running on: ${await app.getUrl()}/graphql`)
}
bootstrap()
