import { Injectable } from '@nestjs/common';
import { PlatformEventResult } from '../interfaces/platform-adapter.interface';

@Injectable()
export class MeetupAdapter {
    async createEvent(data: any, config: any): Promise<PlatformEventResult> {
        return {
            platformId: 'mock-meetup-' + Date.now(),
            url: 'https://meetup.com/events/mock',
            status: 'PUBLISHED',
            rawResponse: { mock: true }
        };
    }

    async updateEvent(id: string, data: any, config: any): Promise<PlatformEventResult> {
        return {
            platformId: id,
            url: 'https://meetup.com/events/mock',
            status: 'PUBLISHED',
            rawResponse: { mock: true, updated: true }
        };
    }
}
