// types/expense.ts
export interface Expense {
  id: string;
  amount: number;
  category: string;
  description?: string;
  date: string; // Date in string format
}
