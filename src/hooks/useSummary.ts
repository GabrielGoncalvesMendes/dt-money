import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const { transactions } = useContext(TransactionContext);

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
}