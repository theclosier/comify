export interface PlatformEventResult {
    platformId: string;
    url: string;
    status: 'DRAFT' | 'PUBLISHED';
    rawResponse?: any;
}
