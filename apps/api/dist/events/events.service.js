"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const meetup_adapter_1 = require("./adapters/meetup.adapter");
const eventbrite_adapter_1 = require("./adapters/eventbrite.adapter");
const luma_adapter_1 = require("./adapters/luma.adapter");
let EventsService = EventsService_1 = class EventsService {
    prisma;
    meetupAdapter;
    eventbriteAdapter;
    lumaAdapter;
    logger = new common_1.Logger(EventsService_1.name);
    constructor(prisma, meetupAdapter, eventbriteAdapter, lumaAdapter) {
        this.prisma = prisma;
        this.meetupAdapter = meetupAdapter;
        this.eventbriteAdapter = eventbriteAdapter;
        this.lumaAdapter = lumaAdapter;
    }
    async create(createEventDto) {
        try {
            this.logger.log(`Creating event: ${createEventDto.title}`);
            let eventId = 'temp-error-id';
            let usePrisma = false;
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
            }
            catch (error) {
                this.logger.error('Prisma Create Failed: ' + error.message, error.stack);
                throw new Error('Database save failed. Cannot process event.');
            }
            const selectedPlatforms = createEventDto.platforms || [];
            const platformIds = {};
            const platformData = {};
            const finalStatus = {};
            if (selectedPlatforms.includes('MEETUP')) {
                const res = await this.runAdapter(this.meetupAdapter, 'MEETUP', createEventDto);
                finalStatus['MEETUP'] = { status: res.status, url: res.url, id: res.platformId, error: res.rawResponse?.error };
                if (res.platformId && !res.rawResponse?.error)
                    platformIds['MEETUP'] = res.platformId;
                platformData['MEETUP'] = res.rawResponse;
            }
            if (selectedPlatforms.includes('EVENTBRITE')) {
                const res = await this.runAdapter(this.eventbriteAdapter, 'EVENTBRITE', createEventDto);
                finalStatus['EVENTBRITE'] = { status: res.status, url: res.url, id: res.platformId, error: res.rawResponse?.error };
                if (res.platformId && !res.rawResponse?.error)
                    platformIds['EVENTBRITE'] = res.platformId;
                platformData['EVENTBRITE'] = res.rawResponse;
            }
            if (selectedPlatforms.includes('LUMA')) {
                const res = await this.runAdapter(this.lumaAdapter, 'LUMA', createEventDto);
                finalStatus['LUMA'] = { status: res.status, url: res.url, id: res.platformId, error: res.rawResponse?.error };
                if (res.platformId && !res.rawResponse?.error)
                    platformIds['LUMA'] = res.platformId;
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
        }
        catch (e) {
            this.logger.error("CRITICAL ERROR IN CREATE: " + e.message, e.stack);
            return { error: e.message, stack: e.stack };
        }
    }
    async runAdapter(adapter, platformName, data) {
        try {
            const config = { apiKey: 'mock-key' };
            return await adapter.createEvent(data, config);
        }
        catch (error) {
            this.logger.error(`Failed to publish to ${platformName}`, error.stack);
            return {
                platformId: "error",
                url: "",
                status: "DRAFT",
                rawResponse: { error: error.message }
            };
        }
    }
    async findAll() {
        return this.prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        return this.prisma.event.findUnique({ where: { id } });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = EventsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        meetup_adapter_1.MeetupAdapter,
        eventbrite_adapter_1.EventbriteAdapter,
        luma_adapter_1.LumaAdapter])
], EventsService);
//# sourceMappingURL=events.service.js.map