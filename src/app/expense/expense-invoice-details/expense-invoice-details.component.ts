import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {fileServer} from '../../constants';
import {PurchaseService} from '../../purchase/purchase.service';
import {Url} from '../../models/Url.model';
import {PurchaseInvoice} from '../../models/purchaseInvoice.model';
import {ExpenseService} from '../expense.service';
import {ExpenseInvoice} from '../../models/expense-invoice.model';
import {CommonService} from '../../common/common.service';

@Component({
  selector: 'app-expense-invoice-details',
  templateUrl: './expense-invoice-details.component.html',
  styleUrls: ['./expense-invoice-details.component.css']
})
export class ExpenseInvoiceDetailsComponent implements OnInit {
  id = '';
  serverUrl = '';
  // date = Date.now();
  expenseInvoice: ExpenseInvoice = {};
  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private purchaseService: ExpenseService) {
    this.serverUrl = fileServer;
    this.id = route.snapshot.params['id'];
    // console.log(this.id);
    this.purchaseService.getInvoiceDetails(this.id).subscribe(
      (data: any) => {
        // console.log(data);
        this.expenseInvoice.id = data.data.id;
        this.expenseInvoice.code = data.data.code;
        this.expenseInvoice.created_at = data.data.created_at;
        this.expenseInvoice.expense_items = data.data.expense_items;
        this.expenseInvoice.expense_by = data.data.expense_by;
        this.expenseInvoice.urls = data.data.urls ;
        this.expenseInvoice.total_amount = data.data.total_amount;
        console.log(this.expenseInvoice);
      }
    );
  }

  ngOnInit() {
    console.log();
  }
  onDocumentPrint() {
    window.print();
  }
  onFileDelete(file: Url) {
    console.log(file);
    this.commonService.deleteFile(file, 'expense_files').subscribe(
      (data: any) => {
        console.log(data);
        this.expenseInvoice.urls.splice(this.expenseInvoice.urls.indexOf(file), 1);
      },
      (error) => console.log(error)
    );
  }

}
