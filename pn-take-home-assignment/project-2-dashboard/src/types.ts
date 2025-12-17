export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    description: string;
    date: string; // ISO 8601 string
}

export interface DashboardSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}
