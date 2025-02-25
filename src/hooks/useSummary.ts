import { useMemo } from 'react';
import { TransactionContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions;
  });

  const summary = useMemo(() => {
    return transactions.reduce(
      (accumulator, transaction) => {
        if(transaction.type === 'income') {
          accumulator.income += transaction.price;
          accumulator.total += transaction.price;
        } else {
          accumulator.outcome += transaction.price;
          accumulator.total -= transaction.price;
        }
        return accumulator;
      }, 
      { 
        income: 0, 
        outcome: 0, 
        total: 0 
      }
    );
  }, [transactions]);

  return summary;
}