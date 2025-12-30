import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
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
