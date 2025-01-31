// types/budget.ts
import { Expense } from "@/types/expense";
import { Income } from "@/types/income";

export interface Budget {
  currentBalance: number;
  expenses: Expense[];
  incomes: Income[];
}
