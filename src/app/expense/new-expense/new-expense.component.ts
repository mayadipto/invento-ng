import { Component, OnInit } from '@angular/core';
import {Expense} from '../../models/expense.model';
import {ExpenseInvoice} from '../../models/expense-invoice.model';
import {Employee} from '../../models/employee.model';
import {ExpenseService} from '../expense.service';
import {CommonService} from '../../common/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent implements OnInit {
  expense: Expense;
  expenseInvoice: ExpenseInvoice;
  editFlag = true;
  employeeText = '';
  employeeOptions: Employee[] = [];
  files: File[] = [];
  statusFlag = false;
  message = {title: '', details: ''};
  constructor(private commonService: CommonService,
              private router: Router,
              private expenseService: ExpenseService) {
    this.expense = {details: '', amount: 0};
    this.expenseInvoice = {expense_items: [], urls: [], expense_by: {id: ''}};
  }

  ngOnInit() {
  }
  getEmployeeByName() {
    if (this.employeeText != this.expenseInvoice.expense_by.name && this.employeeText != '') {
      this.expenseInvoice.expense_by.name = this.employeeText;
      this.expenseService.getEmployees(this.employeeText).subscribe(
        (result: any) => {
          this.employeeOptions = result.data;
        }
      );
    }
  }
  onEmployeeChange(employee: Employee) {
    this.expenseInvoice.expense_by = employee;
    this.employeeText = employee.name;
  }
  addExpense(form) {
    this.expenseInvoice.expense_items.push(this.expense);
    this.expense = {details: '', amount: 0};
  }
  onFilesSelect($event) {
    for (const file of $event.target.files) {
      this.files.push(file);
    }
  }
  onFileRemove(file) {
    this.files.splice(this.files.indexOf(file), 1);
  }

  deleteItem(item: Expense) {
    this.expenseInvoice.expense_items.splice(this.expenseInvoice.expense_items.indexOf(item), 1);
  }
  getTotal() {
    let total = 0;
    for (const item of this.expenseInvoice.expense_items) {
      total += item.amount;
    }
    return total;
  }
  onExpense() {
    this.editFlag = false;
    this.commonService.uploadFiles(this.files).subscribe(
      (result: any) => {
        this.expenseInvoice.urls = result.urls;
        this.expenseService.createExpenseInvoice(this.expenseInvoice).subscribe(
          (data) => {
            this.editFlag = true;
            this.router.navigate(['/expense/invoice']);
          },
          (error: any) => {
            this.statusFlag = true;
            this.message.title = 'Failed';
            this.message.details = 'Expense creation failed. Try again later';
            console.log(error);
          }
        );
      },
      (error: any) => {
        this.statusFlag = true;
        this.message.title = 'Failed';
        this.message.details = 'Expense creation failed. Try again later';
        console.log(error);
      }
    );
  }
  onStatusClose() {
    this.statusFlag = false;
  }
}
