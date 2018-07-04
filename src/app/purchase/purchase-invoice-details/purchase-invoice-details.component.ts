import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PurchaseInvoice} from '../../models/purchaseInvoice.model';
import {PurchaseService} from '../purchase.service';
import {fileServer, server} from '../../constants';
import {Url} from '../../models/Url.model';
import {CommonService} from '../../common/common.service';

@Component({
  selector: 'app-purchase-invoice-details',
  templateUrl: './purchase-invoice-details.component.html',
  styleUrls: ['./purchase-invoice-details.component.css']
})
export class PurchaseInvoiceDetailsComponent implements OnInit {
  id = '';
  serverUrl = '';
  // date = Date.now();
  purchaseInvoice: PurchaseInvoice = {};
  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private purchaseService: PurchaseService) {
    this.serverUrl = fileServer;
    this.id = route.snapshot.params['id'];
    // console.log(this.id);
    this.purchaseService.getInvoiceDetails(this.id).subscribe(
      (data: any) => {
        // console.log(data);
        this.purchaseInvoice.id = data.data.id;
        this.purchaseInvoice.code = data.data.code;
        this.purchaseInvoice.created_at = data.data.created_at;
        this.purchaseInvoice.items = data.data.items;
        this.purchaseInvoice.purchase_by = data.data.purchased_by;
        this.purchaseInvoice.supplier = data.data.supplier;
        this.purchaseInvoice.urls = data.data.urls;
        this.purchaseInvoice.total_price = data.data.total_purchase_price;
        console.log(this.purchaseInvoice);
      }
    );
  }

  ngOnInit() {
    console.log();
  }
  onDocumentPrint() {
    window.print();
    window.print();
  }
  onFileDelete(file: Url) {
    this.commonService.deleteFile(file, 'purchase_files').subscribe(
      (data: any) => console.log(data.status)
    );
    this.purchaseInvoice.urls.splice(this.purchaseInvoice.urls.indexOf(file), 1);
  }

}
