import { Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MeetupAdapter } from './adapters/meetup.adapter';
import { EventbriteAdapter } from './adapters/eventbrite.adapter';
import { LumaAdapter } from './adapters/luma.adapter';
import { PlatformEventResult } from './interfaces/platform-adapter.interface';

@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name);

    constructor(
        private prisma: PrismaService,
        private meetupAdapter: MeetupAdapter,
        private eventbriteAdapter: EventbriteAdapter,
        private lumaAdapter: LumaAdapter,
    ) { }

    async create(createEventDto: CreateEventDto) {
        try {
            this.logger.log(`Creating event: ${createEventDto.title}`);

            let eventId = 'temp-error-id'; // Fallback
            let usePrisma = false;

            // 1. Try Saving to Database
            try {
                this.logger.log('Prisma Create Data: ' + JSON.stringify(createEventDto));
                const event = await this.prisma.event.create({
                    data: {
                        title: createEventDto.title,
                        description: createEventDto.description,
                        startDate: new Date(createEventDto.startDate),
                        endDate: createEventDto.endDate ? new Date(createEventDto.endDate) : null,
                        timezone: createEventDto.timezone,
                        location: createEventDto.location,
                        totalCapacity: createEventDto.totalCapacity,
                        ticketName: createEventDto.ticketName,
                        ticketPrice: createEventDto.ticketPrice,
                        visibility: createEventDto.visibility,
                    },
                });
                eventId = event.id;
                usePrisma = true;
            } catch (error) {
                this.logger.error('Prisma Create Failed: ' + error.message, error.stack);
                throw new Error('Database save failed. Cannot process event.');
            }

            // 3. Syndication Logic
            const selectedPlatforms = createEventDto.platforms || [];

            const platformIds: any = {};
            const platformData: any = {};
            const finalStatus: any = {};

            if (selectedPlatforms.includes('MEETUP')) {
                const res = await this.runAdapter(this.meetupAdapter, 'MEETUP', createEventDto);
                finalStatus['MEETUP'] = { status: res.status, url: res.url, id: res.platformId, error: res.rawResponse?.error };
                if (res.platformId && !res.rawResponse?.error) platformIds['MEETUP'] = res.platformId;
                platformData['MEETUP'] = res.rawResponse;
            }
            if (selectedPlatforms.includes('EVENTBRITE')) {
                const res = await this.runAdapter(this.eventbriteAdapter, 'EVENTBRITE', createEventDto);
                finalStatus['EVENTBRITE'] = { status: res.status, url: res.url, id: res.platformId, error: res.rawResponse?.error };
                if (res.platformId && !res.rawResponse?.error) platformIds['EVENTBRITE'] = res.platformId;
                platformData['EVENTBRITE'] = res.rawResponse;
            }
            if (selectedPlatforms.includes('LUMA')) {
                const res = await this.runAdapter(this.lumaAdapter, 'LUMA', createEventDto);
                finalStatus['LUMA'] = { status: res.status, url: res.url, id: res.platformId, error: res.rawResponse?.error };
                if (res.platformId && !res.rawResponse?.error) platformIds['LUMA'] = res.platformId;
                platformData['LUMA'] = res.rawResponse;
            }

            if (usePrisma) {
                await this.prisma.event.update({
                    where: { id: eventId },
                    data: {
                        platformIds,
                        platformData,
                        platformStatus: finalStatus
                    },
                });
            }

            return {
                id: eventId,
                message: 'Event created in Postgres',
                results: finalStatus
            };

        } catch (e) {
            this.logger.error("CRITICAL ERROR IN CREATE: " + e.message, e.stack);
            return { error: e.message, stack: e.stack };
        }
    }

    private async runAdapter(adapter: any, platformName: string, data: any): Promise<PlatformEventResult> {
        try {
            const config = { apiKey: 'mock-key' };
            return await adapter.createEvent(data, config);
        } catch (error) {
            this.logger.error(`Failed to publish to ${platformName}`, error.stack);
            return {
                platformId: "error",
                url: "",
                status: "DRAFT" as any,
                rawResponse: { error: error.message }
            };
        }
    }

    async findAll() {
        return this.prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async findOne(id: string) {
        return this.prisma.event.findUnique({ where: { id } });
    }
}
