import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { eventStub } from 'src/events/stubs/events.stub'
import { EventsService } from 'src/events/events.service'
import { caregiverStub } from 'src/caregivers/stubs/caregivers.stub'
import { CaregiversService } from 'src/caregivers/caregivers.service'
import { VictimsService } from 'src/victims/victims.service'
import { victimStub } from 'src/victims/stubs/victims.stub'

const GQL_ENDPOINT = '/graphql'

describe('AppController (e2e)', () => {
  let app: INestApplication

  let eventsServiceMockData = {
    findAll: () => [eventStub()],
  }

  let caregiversServiceMockData = {
    findAll: () => [caregiverStub()],
  }

  let victimsServiceMockData = {
    findAll: () => [victimStub()],
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EventsService)
      .useValue(eventsServiceMockData)
      .overrideProvider(CaregiversService)
      .useValue(caregiversServiceMockData)
      .overrideProvider(VictimsService)
      .useValue(victimsServiceMockData)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  describe(GQL_ENDPOINT, () => {
    describe('Events', () => {
      it('should return all events', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: `{ events { id, name, address, postalCode, city, dates } }`,
          })
          .expect(200)
          .expect(res => {
            expect(res.body.data.events).toEqual([
              {
                id: '1',
                name: 'Event 1',
                address: 'event1weg',
                postalCode: '1234',
                city: 'City',
                dates: ['2023-12-21T23:00:00.000Z'],
              },
            ])
          })
      })
    })

    describe('Caregivers', () => {
      it('should return all caregivers', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: `{caregivers {id, firstName, lastName}}`,
          })
          .expect(200)
          .expect(res => {
            expect(res.body.data.caregivers).toEqual([
              {
                id: '123123123123',
                firstName: 'john',
                lastName: 'doe',
              },
            ])
          })
      })
    })

    describe('Victims', () => {
      it('should return all victims', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: `{getVictims {id, firstName, lastName}}`,
          })
          .expect(200)
          .expect(res => {
            expect(res.body.data.getVictims).toEqual([
              {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
              },
            ])
          })
      })
    })

    afterAll(async () => {
      await app.close()
    })
  })
})
