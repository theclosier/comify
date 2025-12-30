import { PlatformEventResult } from '../interfaces/platform-adapter.interface';
export declare class EventbriteAdapter {
    createEvent(data: any, config: any): Promise<PlatformEventResult>;
    updateEvent(id: string, data: any, config: any): Promise<PlatformEventResult>;
}
