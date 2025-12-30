export declare class CreateEventDto {
    title: string;
    description?: string;
    startDate: Date | string;
    endDate?: Date | string;
    timezone?: string;
    location?: string;
    totalCapacity: number;
    ticketName?: string;
    ticketPrice?: number;
    visibility?: string;
    platforms?: string[];
}
