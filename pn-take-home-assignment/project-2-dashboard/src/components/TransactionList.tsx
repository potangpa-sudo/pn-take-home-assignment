import React from 'react';
import { motion } from 'framer-motion';
import type { Transaction } from '../types';
import { TransactionRow } from './TransactionRow';

interface TransactionListProps {
    transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    if (transactions.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No transactions found.
            </div>
        );
    }

    return (
        <motion.section
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.2
                    }
                }
            }}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            aria-labelledby="recent-transactions-title"
        >
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2
                    id="recent-transactions-title"
                    className="text-sm font-semibold text-gray-700"
                >
                    Recent Transactions
                </h2>
            </div>
            <ul role="list">
                {transactions.map((transaction) => (
                    <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </motion.section>
    );
};
