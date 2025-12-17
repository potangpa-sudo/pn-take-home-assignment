import { describe, it, expect } from 'vitest';
import { calculateSummary } from './calculations';
import type { Transaction } from '../types';

describe('calculateSummary', () => {
    it('correctly calculates totals and balance', () => {
        const transactions: Transaction[] = [
            { id: '1', type: 'income', amount: 1000, description: 'Salary', date: '2024-01-01' },
            { id: '2', type: 'expense', amount: 200, description: 'Food', date: '2024-01-01' },
            { id: '3', type: 'expense', amount: 300, description: 'Rent', date: '2024-01-01' },
        ];

        const result = calculateSummary(transactions);

        expect(result.totalIncome).toBe(1000);
        expect(result.totalExpense).toBe(500);
        expect(result.balance).toBe(500);
    });

    it('handles empty transaction list', () => {
        const result = calculateSummary([]);

        expect(result.totalIncome).toBe(0);
        expect(result.totalExpense).toBe(0);
        expect(result.balance).toBe(0);
    });

    it('handles only income', () => {
        const transactions: Transaction[] = [
            { id: '1', type: 'income', amount: 500, description: 'Bonus', date: '2024-01-01' },
        ];

        const result = calculateSummary(transactions);

        expect(result.totalIncome).toBe(500);
        expect(result.totalExpense).toBe(0);
        expect(result.balance).toBe(500);
    });

    it('rounds totals and balance to 2 decimals', () => {
        const transactions: Transaction[] = [
            { id: '1', type: 'income', amount: 0.1, description: 'A', date: '2024-01-01' },
            { id: '2', type: 'income', amount: 0.2, description: 'B', date: '2024-01-01' },
            { id: '3', type: 'expense', amount: 0.105, description: 'C', date: '2024-01-01' },
        ];

        const result = calculateSummary(transactions);

        expect(result.totalIncome).toBe(0.3);
        expect(result.totalExpense).toBe(0.11);
        expect(result.balance).toBe(0.19);
    });

    it('ignores invalid amounts and unknown types', () => {
        const unknownTypeTransaction = {
            id: '3',
            type: 'transfer',
            amount: 50,
            description: 'Xfer',
            date: '2024-01-01',
        } as unknown as Transaction;

        const transactions: Transaction[] = [
            { id: '1', type: 'income', amount: 100, description: 'Good', date: '2024-01-01' },
            { id: '2', type: 'income', amount: Number.POSITIVE_INFINITY, description: 'Bad', date: '2024-01-01' },
            unknownTypeTransaction,
        ];

        const result = calculateSummary(transactions);

        expect(result.totalIncome).toBe(100);
        expect(result.totalExpense).toBe(0);
        expect(result.balance).toBe(100);
    });
});
