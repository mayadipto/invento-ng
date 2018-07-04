import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';
import {ExpenseService} from '../expense.service';

@Component({
  selector: 'app-expense-invoice-list',
  templateUrl: './expense-invoice-list.component.html',
  styleUrls: ['./expense-invoice-list.component.css']
})
export class ExpenseInvoiceListComponent {

  displayedColumns = ['sl', 'code', 'expense_by', 'total_amount', 'created_at', 'action'];
  dataSource: MatTableDataSource<TableData>;
  tableDataSubscriber: Subscription;
  nextPageLink: string = null;
  data: TableData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private expenseService: ExpenseService) {

    this.tableDataSubscriber = this.expenseService.getAllExpenseInvoice(this.nextPageLink).subscribe(
      (result) => {
        this.pushTableData(result);
        console.log(result);
        console.log(this.data);
      }
    );
  }

  pushTableData(result: any) {
    let i = this.data.length + 1;
    for (const invoice of result.data) {
      const tableData: TableData = {
        sl: i++,
        id: invoice.id,
        code: invoice.code,
        total_amount: invoice.total_amount,
        expense_by: invoice.expense_by.name,
        created_at: invoice.created_at
      };
      // console.log(result);
      this.data.push(tableData);
    }
    this.nextPageLink = result.links.next;
    console.log(this.nextPageLink);
    console.log(result);
    // console.log(data);
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logInfo(e: PageEvent) {
    console.log(e);
    const currentIndex = e.pageIndex;
    const totalPages = e.length / e.pageSize;
    if (currentIndex >= totalPages - 2 && this.nextPageLink != null) {
      console.log('Need more');
      this.tableDataSubscriber = this.expenseService.getAllExpenseInvoice(this.nextPageLink).subscribe(
        (result) => {
          this.pushTableData(result);
        }
      );
    }
  }


}

interface TableData {
  sl?: number;
  id?: string;
  code?: string;
  total_amount?: string;
  expense_by?: string;
  created_at?: string;
}
