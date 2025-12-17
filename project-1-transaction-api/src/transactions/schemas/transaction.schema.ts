import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

@Schema({ timestamps: true })
export class Transaction {
    @Prop({ required: true, enum: TransactionType })
    type!: TransactionType;

    @Prop({ required: true, min: 0.01 })
    amount!: number;

    @Prop({ default: 'THB' })
    currency!: string;

    @Prop()
    title?: string;

    @Prop()
    note?: string;

    @Prop()
    category?: string;

    @Prop({ default: () => new Date() })
    occurredAt!: Date;

    @Prop({ type: Date, default: null })
    deletedAt!: Date | null;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.index({ deletedAt: 1 });
TransactionSchema.index({ type: 1, occurredAt: -1 });
