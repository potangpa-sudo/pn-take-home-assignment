import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockTransactions } from '../data/mockData';
import { calculateSummary } from '../utils/calculations';
import { SummaryCard } from './SummaryCard';
import { TransactionList } from './TransactionList';

export const Dashboard: React.FC = () => {
    // Sort transactions by date (newest first)
    const sortedTransactions = useMemo(() => {
        return [...mockTransactions].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, []);

    const summary = useMemo(() => calculateSummary(sortedTransactions), [sortedTransactions]);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
            className="max-w-4xl mx-auto px-4 py-8 space-y-8"
        >
            <motion.header
                variants={{
                    hidden: { y: -20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                }}
                className="mb-8"
            >
                <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
                <p className="text-gray-500">Overview of your recent transactions</p>
            </motion.header>

            {/* Summary Cards Grid */}
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <SummaryCard
                    title="Total Income"
                    amount={summary.totalIncome}
                    type="income"
                />
                <SummaryCard
                    title="Total Expenses"
                    amount={summary.totalExpense}
                    type="expense"
                />
                <SummaryCard
                    title="Net Balance"
                    amount={summary.balance}
                    type="balance"
                />
            </motion.div>

            {/* Transaction List */}
            <motion.section
                variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                }}
            >
                <TransactionList transactions={sortedTransactions} />
            </motion.section>
        </motion.div>
    );
};
