import { TransactionType } from '../schemas/transaction.schema';
export declare class CreateTransactionDto {
    type: TransactionType;
    amount: number;
    currency?: string;
    title?: string;
    note?: string;
    category?: string;
    occurredAt?: string;
}
