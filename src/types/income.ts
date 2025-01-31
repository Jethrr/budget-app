// types/income.ts
export interface Income {
  id: string;
  amount: number;
  source: string;
  description?: string;
  date: string; // Date in string format
}
