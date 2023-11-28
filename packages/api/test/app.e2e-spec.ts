import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { eventStub } from 'src/events/stubs/events.stub'
import { EventsService } from 'src/events/events.service'

const GQL_ENDPOINT = '/graphql'

describe('AppController (e2e)', () => {
  let app: INestApplication

  let eventsServiceMockData = {
    findAll: () => [eventStub()],
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EventsService)
      .useValue(eventsServiceMockData)
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
                dates: ['2020-01-01T00:00:00.000Z'],
              },
            ])
          })
      })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
