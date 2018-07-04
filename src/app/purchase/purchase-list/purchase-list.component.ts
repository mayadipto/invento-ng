import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {PurchaseService} from '../purchase.service';
import {Subscriber} from 'rxjs';
import {s} from '@angular/core/src/render3';
import {current} from 'codelyzer/util/syntaxKind';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnDestroy {

  displayedColumns = ['sl', 'item', 'brand', 'category', 'purchase_price', 'sell_price', 'created_at'];
  dataSource: MatTableDataSource<TableData>;
  tableDataSubscriber: Subscriber<any>;
  nextPageLink: string = null;
  data: TableData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private purchaseService: PurchaseService) {
    // Create 100 users
    this.tableDataSubscriber = this.purchaseService.getPurchases(this.nextPageLink).subscribe(
      (result) => {
        this.pushTableData(result);
      }
    );
  }

  pushTableData(result: any) {
    let i = this.data.length + 1;
    for (const purchaseItem of result.data) {
      const tableData: TableData = {
        sl: i++,
        id: purchaseItem.id,
        item: purchaseItem.item.name,
        brand: purchaseItem.item.brand,
        category: purchaseItem.item.category,
        purchase_price: purchaseItem.purchase_price,
        sell_price: purchaseItem.sell_price,
        unit: purchaseItem.item.unit,
        created_at: purchaseItem.created_at
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

  ngOnDestroy() {
    // this.tableDataSubscriber.unsubscribe();
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
      this.tableDataSubscriber = this.purchaseService.getPurchases(this.nextPageLink).subscribe(
        (result) => {
          this.pushTableData(result);
        }
      );
    }
  }

}

export interface TableData {
  sl?: number;
  id?: string;
  item?: string;
  brand?: string;
  category?: string;
  purchase_price?: string;
  sell_price?: string;
  unit?: string;
  created_at?: string;
}



