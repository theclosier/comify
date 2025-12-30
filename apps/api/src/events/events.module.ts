import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MeetupAdapter } from './adapters/meetup.adapter';
import { EventbriteAdapter } from './adapters/eventbrite.adapter';
import { LumaAdapter } from './adapters/luma.adapter';

@Module({
    controllers: [EventsController],
    providers: [EventsService, MeetupAdapter, EventbriteAdapter, LumaAdapter],
})
export class EventsModule { }
