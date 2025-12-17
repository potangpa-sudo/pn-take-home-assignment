import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import type { Transaction } from '../types';
import { formatCurrency } from '../utils/money';

interface TransactionRowProps {
    transaction: Transaction;
}

const dateTimeFormatter = new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
    const date = new Date(transaction.date);
    const formattedDate = dateTimeFormatter.format(date);

    const isIncome = transaction.type === 'income';
    const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
    const sign = isIncome ? '+' : '-';

    return (
        <motion.li
            variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
            }}
            className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-default"
        >
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isIncome ? (
                        <ArrowUpRight className="h-5 w-5 text-green-600" aria-hidden="true" focusable="false" />
                    ) : (
                        <ArrowDownLeft className="h-5 w-5 text-red-600" aria-hidden="true" focusable="false" />
                    )}
                </div>
                <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-400">{formattedDate}</p>
                </div>
            </div>
            <div className={`font-bold ${amountColor}`}>
                {sign}{formatCurrency(transaction.amount)}
            </div>
        </motion.li>
    );
};
