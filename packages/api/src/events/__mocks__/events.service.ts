import { eventStub } from '../stubs/events.stub'

export const EventsService = jest.fn().mockReturnValue({
  findAllByDate: jest.fn().mockResolvedValue([eventStub()]),
  create: jest.fn().mockResolvedValue(eventStub()),
})
