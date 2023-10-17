import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { CaregiversModule } from './caregivers/caregivers.module'
import { EquipmentsModule } from './equipments/equipments.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedModule } from './seed/seed.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { EventsModule } from './events/events.module'
import { CommandModule } from 'nestjs-command'

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // playground: true,
      playground: process.env.NODE_ENV == 'production' ? false : true,
    }),

    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, // DOCKER
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: process.env.NODE_ENV == 'production' ? false : true, // Careful with this in production
      useNewUrlParser: true,
      useUnifiedTopology: true, // Disable deprecated warnings
    }),

    CaregiversModule,
    EquipmentsModule,
    SeedModule,
    AuthenticationModule,
    UsersModule,
    EventsModule,
    CommandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
