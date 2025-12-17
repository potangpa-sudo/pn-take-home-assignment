import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument, TransactionType } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectModel(Transaction.name) private readonly txModel: Model<TransactionDocument>,
    ) { }

    async create(dto: CreateTransactionDto) {
        return this.txModel.create({
            ...dto,
            occurredAt: dto.occurredAt ? new Date(dto.occurredAt) : new Date(),
            deletedAt: null,
        });
    }

    async findAll(params: { type?: TransactionType; includeDeleted?: boolean }) {
        const filter: any = {};
        if (params.type) filter.type = params.type;
        if (!params.includeDeleted) filter.deletedAt = null;

        return this.txModel.find(filter).sort({ occurredAt: -1, createdAt: -1 }).exec();
    }

    async findOne(id: string, includeDeleted = false) {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Transaction not found');

        const filter: any = { _id: id };
        if (!includeDeleted) filter.deletedAt = null;

        const doc = await this.txModel.findOne(filter).exec();
        if (!doc) throw new NotFoundException('Transaction not found');
        return doc;
    }

    async update(id: string, dto: UpdateTransactionDto) {
        await this.findOne(id, true);

        const update: any = { ...dto };
        if (dto.occurredAt) update.occurredAt = new Date(dto.occurredAt);

        const doc = await this.txModel.findByIdAndUpdate(id, update, { new: true }).exec();
        if (!doc) throw new NotFoundException('Transaction not found');
        return doc;
    }

    async softDelete(id: string) {
        const doc = await this.findOne(id, true);
        if (!doc.deletedAt) doc.deletedAt = new Date(); // idempotent
        return doc.save();
    }

    async restore(id: string) {
        const doc = await this.findOne(id, true);
        doc.deletedAt = null;
        return doc.save();
    }
}
