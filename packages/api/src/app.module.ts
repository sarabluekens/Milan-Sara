import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { CaregiversModule } from './caregivers/caregivers.module'
import { EquipmentsModule } from './equipments/equipments.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27027/api',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // Careful with this in production
      useNewUrlParser: true,
      useUnifiedTopology: true, // Disable deprecated warnings
    }),

    CaregiversModule,
    EquipmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
