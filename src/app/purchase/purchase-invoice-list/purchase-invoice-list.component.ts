import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PurchaseService} from '../purchase.service';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-purchase-invoice-list',
  templateUrl: './purchase-invoice-list.component.html',
  styleUrls: ['./purchase-invoice-list.component.css']
})
export class PurchaseInvoiceListComponent implements OnDestroy {

  displayedColumns = ['sl', 'code', 'total_amount', 'supplier_name', 'user_name', 'created_at', 'action'];
  dataSource: MatTableDataSource<TableData>;
  tableDataSubscriber: Subscription;
  nextPageLink: string = null;
  data: TableData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private purchaseService: PurchaseService) {

    this.tableDataSubscriber = this.purchaseService.getAllPurchaseInvoice(this.nextPageLink).subscribe(
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
        supplier_name: invoice.supplier.name,
        supplier_id: invoice.supplier.id,
        user_name: invoice.purchased_by.name,
        user_id: invoice.purchased_by.id,
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
      this.tableDataSubscriber = this.purchaseService.getAllPurchaseInvoice(this.nextPageLink).subscribe(
        (result) => {
          this.pushTableData(result);
        }
      );
    }
  }

  ngOnDestroy() {
    // this.tableDataSubscriber.unsubscribe();
  }

}

interface TableData {
  sl?: number;
  id?: string;
  code?: string;
  total_purchase_price?: string;
  supplier_name?: string;
  supplier_id?: string;
  user_name?: string;
  user_id?: string;
  created_at?: string;
}
