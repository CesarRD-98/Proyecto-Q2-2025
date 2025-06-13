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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./ticket.entity");
const typeorm_3 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const area_entity_1 = require("../areas/area.entity");
let TicketsService = class TicketsService {
    constructor(ticketRepo, userRepo, areaRepo) {
        this.ticketRepo = ticketRepo;
        this.userRepo = userRepo;
        this.areaRepo = areaRepo;
    }
    async create(data) {
        const ticket = this.ticketRepo.create(data);
        if (data.area && typeof data.area === 'number') {
            const area = await this.areaRepo.findOneBy({ id: data.area });
            if (!area)
                throw new Error('Área no encontrada');
            ticket.area = area;
        }
        return this.ticketRepo.save(ticket);
    }
    async findAll(user) {
        if (user.role === 'user') {
            return this.ticketRepo.find({ where: { user: { id: user.id } }, order: { createdAt: 'ASC' } });
        }
        return this.ticketRepo.find({ order: { createdAt: 'ASC' } });
    }
    async findOne(id) {
        return this.ticketRepo.findOne({ where: { id } });
    }
    async update(id, data) {
        const ticket = await this.ticketRepo.findOne({
            where: { id },
            relations: ['user', 'assignedTo'],
        });
        if (!ticket) {
            throw new Error('Ticket no encontrado');
        }
        if (data.status) {
            const validStatuses = ['pending', 'in_progress', 'finalized', 'cancelled'];
            if (!validStatuses.includes(data.status)) {
                throw new Error('Estado no válido');
            }
            ticket.status = data.status;
        }
        if (data.assignedTo) {
            const techId = Number(data.assignedTo);
            if (isNaN(techId)) {
                throw new Error('ID de técnico inválido');
            }
            const tech = await this.userRepo.findOneBy({ id: techId });
            if (!tech || tech.role !== 'technician') {
                throw new Error('Técnico no válido');
            }
            ticket.assignedTo = tech;
        }
        return this.ticketRepo.save(ticket);
    }
    async countByStatus(from, to) {
        const [total, finalized] = await Promise.all([
            this.ticketRepo.count({ where: { createdAt: (0, typeorm_3.Between)(from, to) } }),
            this.ticketRepo.count({ where: { createdAt: (0, typeorm_3.Between)(from, to), status: 'finalized' } }),
        ]);
        return { total, finalized };
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map