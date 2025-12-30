"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetupAdapter = void 0;
const common_1 = require("@nestjs/common");
let MeetupAdapter = class MeetupAdapter {
    async createEvent(data, config) {
        return {
            platformId: 'mock-meetup-' + Date.now(),
            url: 'https://meetup.com/events/mock',
            status: 'PUBLISHED',
            rawResponse: { mock: true }
        };
    }
    async updateEvent(id, data, config) {
        return {
            platformId: id,
            url: 'https://meetup.com/events/mock',
            status: 'PUBLISHED',
            rawResponse: { mock: true, updated: true }
        };
    }
};
exports.MeetupAdapter = MeetupAdapter;
exports.MeetupAdapter = MeetupAdapter = __decorate([
    (0, common_1.Injectable)()
], MeetupAdapter);
//# sourceMappingURL=meetup.adapter.js.map