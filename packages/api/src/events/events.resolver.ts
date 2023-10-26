import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { EventsService } from './events.service'
import { Event } from './entities/event.entity'
import { CreateEventInput } from './dto/create-event.input'
import { UpdateEventInput } from './dto/update-event.input'

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventsService.findAll()
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.findOne(id)
  }

  @Mutation(() => Event)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ): Promise<Event> {
    return this.eventsService.create(createEventInput)
  }

  @Mutation(() => Event)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventsService.update(updateEventInput.id, updateEventInput)
  }

  @Mutation(() => Event)
  removeEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.remove(id)
  }
}