import {Employee} from './employee.model';
import {Expense} from './expense.model';
import {Url} from './Url.model';

export interface ExpenseInvoice {
  id?: string;
  code?: string;
  expense_items?: Expense[];
  expense_by?: Employee;
  total_amount?: number;
  urls?: Url[];
  created_at?: string;
  updated_at?: string;
}
