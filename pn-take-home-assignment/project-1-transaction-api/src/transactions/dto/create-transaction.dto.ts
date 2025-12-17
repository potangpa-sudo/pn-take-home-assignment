import { IsDateString, IsEnum, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { TransactionType } from '../schemas/transaction.schema';

export class CreateTransactionDto {
    @IsEnum(TransactionType)
    type!: TransactionType;

    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsOptional()
    @IsString()
    currency?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsDateString()
    occurredAt?: string; // ✅ add this
}
