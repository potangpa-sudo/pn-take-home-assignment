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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("./schemas/transaction.schema");
let TransactionsService = class TransactionsService {
    txModel;
    constructor(txModel) {
        this.txModel = txModel;
    }
    async create(dto) {
        return this.txModel.create({
            ...dto,
            occurredAt: dto.occurredAt ? new Date(dto.occurredAt) : new Date(),
            deletedAt: null,
        });
    }
    async findAll(params) {
        const filter = {};
        if (params.type)
            filter.type = params.type;
        if (!params.includeDeleted)
            filter.deletedAt = null;
        return this.txModel.find(filter).sort({ occurredAt: -1, createdAt: -1 }).exec();
    }
    async findOne(id, includeDeleted = false) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Transaction not found');
        const filter = { _id: id };
        if (!includeDeleted)
            filter.deletedAt = null;
        const doc = await this.txModel.findOne(filter).exec();
        if (!doc)
            throw new common_1.NotFoundException('Transaction not found');
        return doc;
    }
    async update(id, dto) {
        await this.findOne(id, true);
        const update = { ...dto };
        if (dto.occurredAt)
            update.occurredAt = new Date(dto.occurredAt);
        const doc = await this.txModel.findByIdAndUpdate(id, update, { new: true }).exec();
        if (!doc)
            throw new common_1.NotFoundException('Transaction not found');
        return doc;
    }
    async softDelete(id) {
        const doc = await this.findOne(id, true);
        if (!doc.deletedAt)
            doc.deletedAt = new Date();
        return doc.save();
    }
    async restore(id) {
        const doc = await this.findOne(id, true);
        doc.deletedAt = null;
        return doc.save();
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map