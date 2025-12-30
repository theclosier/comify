import { Injectable } from '@nestjs/common';
import { PlatformEventResult } from '../interfaces/platform-adapter.interface';

@Injectable()
export class EventbriteAdapter {
    async createEvent(data: any, config: any): Promise<PlatformEventResult> {
        return {
            platformId: 'mock-eb-' + Date.now(),
            url: 'https://eventbrite.com/events/mock',
            status: 'DRAFT',
            rawResponse: { mock: true }
        };
    }

    async updateEvent(id: string, data: any, config: any): Promise<PlatformEventResult> {
        return {
            platformId: id,
            url: 'https://eventbrite.com/events/mock',
            status: 'DRAFT',
            rawResponse: { mock: true, updated: true }
        };
    }
}
