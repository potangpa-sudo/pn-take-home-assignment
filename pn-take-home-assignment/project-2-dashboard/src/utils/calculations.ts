import type { Transaction, DashboardSummary } from '../types';

const roundToTwoDecimals = (value: number): number => Math.round(value * 100) / 100;

const createEmptySummary = (): DashboardSummary => ({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
});

const parseAmount = (rawAmount: Transaction['amount']): number | null => {
    const value = Number(rawAmount);
    return Number.isFinite(value) ? value : null;
};

export const calculateSummary = (transactions: Transaction[]): DashboardSummary => {
    const totals = transactions.reduce<DashboardSummary>((acc, transaction) => {
        const amount = parseAmount(transaction.amount);

        if (amount === null) {
            return acc; // invalid amount, skip
        }

        if (transaction.type === 'income') {
            acc.totalIncome += amount;
        } else if (transaction.type === 'expense') {
            acc.totalExpense += amount;
        }

        return acc;
    }, createEmptySummary());

    const totalIncome = roundToTwoDecimals(totals.totalIncome);
    const totalExpense = roundToTwoDecimals(totals.totalExpense);
    const balance = roundToTwoDecimals(totalIncome - totalExpense);

    return {
        totalIncome,
        totalExpense,
        balance,
    };
};
