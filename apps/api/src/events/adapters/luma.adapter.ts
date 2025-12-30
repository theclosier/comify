import { Injectable } from '@nestjs/common';
import { PlatformEventResult } from '../interfaces/platform-adapter.interface';

@Injectable()
export class LumaAdapter {
    async createEvent(data: any, config: any): Promise<PlatformEventResult> {
        return {
            platformId: 'mock-luma-' + Date.now(),
            url: 'https://lu.ma/events/mock',
            status: 'PUBLISHED',
            rawResponse: { mock: true }
        };
    }

    async updateEvent(id: string, data: any, config: any): Promise<PlatformEventResult> {
        return {
            platformId: id,
            url: 'https://lu.ma/events/mock',
            status: 'PUBLISHED',
            rawResponse: { mock: true, updated: true }
        };
    }
}
