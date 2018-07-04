import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SellService} from '../sell.service';
import {SellInvoice} from '../../models/sell-invoice.model';
import {fileServer} from '../../constants';
import {Url} from '../../models/Url.model';
import {PurchaseService} from '../../purchase/purchase.service';
import {CommonService} from '../../common/common.service';

@Component({
  selector: 'app-sell-invoice-details',
  templateUrl: './sell-invoice-details.component.html',
  styleUrls: ['./sell-invoice-details.component.css']
})
export class SellInvoiceDetailsComponent implements OnInit {
  id: string;
  serverUrl: string;
  sellInvoice: SellInvoice;
  constructor(
    private route: ActivatedRoute,
    private sellService: SellService,
    // private commonService: CommonService,
    // private purchaseService: PurchaseService
  ) {
    this.serverUrl = fileServer;
    this.id = route.snapshot.params['id'];
    this.sellService.getInvoice(this.id).subscribe(
      (result: any) => {
        this.sellInvoice = result.data;
        console.log(this.sellInvoice);
      }
    );
  }

  ngOnInit() {
  }
  onDocumentPrint() {
    window.print();
  }
  // onFileDelete(file: Url) {
  //   this.commonService.deleteFile(file, 'sells_files').subscribe(
  //     (data: any) => console.log(data.status)
  //   );
  //   this.sellInvoice.files.splice(this.sellInvoice.files.indexOf(file));
  // }
  getGrandTotal(productPrice: string, vatAmount: string) {
    return parseFloat(productPrice) + parseFloat(vatAmount);
  }

}
