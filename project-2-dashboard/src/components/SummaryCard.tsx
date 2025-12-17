import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/money';

interface SummaryCardProps {
    title: string;
    amount: number;
    type: 'income' | 'expense' | 'balance';
}

const amountColorByType: Record<SummaryCardProps['type'], string> = {
    income: 'text-green-600',
    expense: 'text-red-600',
    balance: 'text-blue-600',
};

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
    const amountColor = amountColorByType[type];

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 rounded-xl shadow-sm border border-gray-100 bg-white"
        >
            <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
            <p className={`text-2xl font-bold ${amountColor}`}>{formatCurrency(amount)}</p>
        </motion.div>
    );
};
