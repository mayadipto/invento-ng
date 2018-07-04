import {Component, OnInit, ViewChild} from '@angular/core';
import {PurchaseService} from '../../purchase/purchase.service';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';
import {SellService} from '../sell.service';

@Component({
  selector: 'app-sell-invoice-list',
  templateUrl: './sell-invoice-list.component.html',
  styleUrls: ['./sell-invoice-list.component.css']
})
export class SellInvoiceListComponent {

  displayedColumns = ['sl', 'code', 'total_purchase_amount', 'total_sell_amount', 'customer_name', 'user_name', 'created_at', 'action'];
  dataSource: MatTableDataSource<TableData>;
  tableDataSubscriber: Subscription;
  nextPageLink: string = null;
  data: TableData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sellService: SellService) {

    this.tableDataSubscriber = this.sellService.getAllInvoices(this.nextPageLink).subscribe(
      (result) => {
        this.pushTableData(result);
        // console.log(result);
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
        total_purchase_price: invoice.total_purchase_price,
        total_sell_price: invoice.total_sell_price,
        customer_name: invoice.customer.name,
        user_name: invoice.sell_by.name,
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
      this.tableDataSubscriber = this.sellService.getAllInvoices(this.nextPageLink).subscribe(
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
  total_purchase_price?: string;
  total_sell_price?: string;
  customer_name?: string;
  user_name?: string;
  created_at?: string;
}
