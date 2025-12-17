import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
import { TransactionType } from './schemas/transaction.schema';
export declare class TransactionsController {
    private readonly service;
    constructor(service: TransactionsService);
    create(dto: CreateTransactionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(type?: TransactionType, includeDeleted?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string, includeDeleted?: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateTransactionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    softDelete(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    restore(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/transaction.schema").Transaction, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/transaction.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
