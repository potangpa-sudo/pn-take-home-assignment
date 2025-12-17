import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
import { TransactionType } from './schemas/transaction.schema';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService) { }

    @Post()
    create(@Body() dto: CreateTransactionDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll(
        @Query('type') type?: TransactionType,
        @Query('includeDeleted') includeDeleted?: string,
    ) {
        return this.service.findAll({
            type,
            includeDeleted: includeDeleted === 'true',
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Query('includeDeleted') includeDeleted?: string) {
        return this.service.findOne(id, includeDeleted === 'true');
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTransactionDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    softDelete(@Param('id') id: string) {
        return this.service.softDelete(id);
    }

    @Post(':id/restore')
    restore(@Param('id') id: string) {
        return this.service.restore(id);
    }
}
