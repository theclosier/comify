import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MeetupAdapter } from './adapters/meetup.adapter';
import { EventbriteAdapter } from './adapters/eventbrite.adapter';
import { LumaAdapter } from './adapters/luma.adapter';
export declare class EventsService {
    private prisma;
    private meetupAdapter;
    private eventbriteAdapter;
    private lumaAdapter;
    private readonly logger;
    constructor(prisma: PrismaService, meetupAdapter: MeetupAdapter, eventbriteAdapter: EventbriteAdapter, lumaAdapter: LumaAdapter);
    create(createEventDto: CreateEventDto): Promise<{
        id: string;
        message: string;
        results: any;
        error?: undefined;
        stack?: undefined;
    } | {
        error: any;
        stack: any;
        id?: undefined;
        message?: undefined;
        results?: undefined;
    }>;
    private runAdapter;
    findAll(): Promise<{
        status: import(".prisma/client").$Enums.EventStatus;
        id: string;
        title: string;
        description: string | null;
        startDate: Date;
        endDate: Date | null;
        timezone: string;
        location: string | null;
        totalCapacity: number;
        visibility: string;
        ticketName: string | null;
        ticketPrice: import("@prisma/client/runtime/library").Decimal | null;
        platformIds: import("@prisma/client/runtime/library").JsonValue | null;
        platformData: import("@prisma/client/runtime/library").JsonValue | null;
        platformStatus: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        status: import(".prisma/client").$Enums.EventStatus;
        id: string;
        title: string;
        description: string | null;
        startDate: Date;
        endDate: Date | null;
        timezone: string;
        location: string | null;
        totalCapacity: number;
        visibility: string;
        ticketName: string | null;
        ticketPrice: import("@prisma/client/runtime/library").Decimal | null;
        platformIds: import("@prisma/client/runtime/library").JsonValue | null;
        platformData: import("@prisma/client/runtime/library").JsonValue | null;
        platformStatus: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
