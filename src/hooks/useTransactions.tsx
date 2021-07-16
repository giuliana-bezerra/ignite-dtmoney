import { createContext, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  ammount: number;
  category: string;
  createdAt: string;
  type: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (transactionId: number) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(newTransaction: TransactionInput) {
    const response = await api.post('/transactions', {
      ...newTransaction,
      createdAt: new Date(),
    });
    const transaction = response.data;
    setTransactions([...transactions, transaction]);
  }

  async function removeTransaction(transactionId: number) {
    const { data } = await api.delete(`/transactions/${transactionId}`);
    setTransactions(data.transactions);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
