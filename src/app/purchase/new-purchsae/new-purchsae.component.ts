import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../models/Item.model';
import {PurchaseService} from '../purchase.service';
import {Supplier} from '../../models/supplier.model';
import {PurchaseItem} from '../../models/purchaseItem.model';
import {PurchaseInvoice} from '../../models/purchaseInvoice.model';
import {Url} from '../../models/Url.model';
import {Subscriber, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {CommonService} from '../../common/common.service';

@Component({
  selector: 'app-new-purchsae',
  templateUrl: './new-purchsae.component.html',
  styleUrls: ['./new-purchsae.component.css']
})
export class NewPurchsaeComponent implements OnInit, OnDestroy {
  code = '';
  itemOptions: Item[] = [];
  item = '';
  selectedItem: Item = {name: '', purchase_price: 0, sell_price: 0, quantity: 0};
  supplierOptions: Supplier[] = [];
  supplier = '';
  selectedSupplier: Supplier = {name: ''};
  details: any = '';
  purchaseList: PurchaseItem[] = [];
  files: any[] = [];
  total = 0;
  editFlag = true;

  // For status
  statusFlug = false;
  message = {
    title: 'Success',
    details: 'Items successfully purchased!!!',
  };
  constructor(private router: Router,
              private commonService: CommonService,
              private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.generatePurchaseCode();
  }
  generatePurchaseCode() {
    this.code = 'buy-' + Math.round(Math.random() * 1000) + Date.now() + 6 * 60;
  }
  getSupplierByName() {
    if (this.supplier != this.selectedSupplier.name && this.supplier != '') {
      this.selectedSupplier.name = this.supplier;
      this.purchaseService.getSupplierByName(this.supplier).subscribe(
        (data) => {
          this.supplierOptions = data as Supplier[];
          // console.log(this.supplierOptions);
        }
      );
    }
  }
  onSupplierChange(supplier) {
    this.selectedSupplier = supplier;
    this.supplierOptions = [];
    // console.log(this.selectedSupplier);
  }
  getItemByName() {
    if (this.item != this.selectedItem.name && this.item != '') {
      this.selectedItem.name = this.item;
      this.purchaseService.getItemsByName(this.item).subscribe(
        (result: any) => {
          this.itemOptions = result.data as Item[];
          // console.log(this.itemOptions);
          // console.log(data);
        }
      );
    }
  }
  onItemChange(item) {
    this.selectedItem = item;
    this.itemOptions = [];
    // console.log(this.selectedItem);
  }

  addPurchaseItem(f) {
    this.total += (this.selectedItem.purchase_price * this.selectedItem.quantity);
    console.log(this.total);
    let isItemAlreadyInList = false;
    for (const x of this.purchaseList) {
      if (x.item == this.selectedItem) {
        x.quantity += f.value.quantity;
        isItemAlreadyInList = true;
      }
    }
    if (!isItemAlreadyInList) {
      const purchaseItem: PurchaseItem = {
        item: this.selectedItem,
        quantity: f.value.quantity,
        purchase_price: f.value.purchasePrice,
        sell_price: f.value.sellPrice,
        details: f.value.details,
      };
      this.purchaseList.push(purchaseItem);
    }
    // console.log(this.purchaseList);
  }
  deleteItem(purchaseItem: PurchaseItem) {
    this.total -= purchaseItem.purchase_price * purchaseItem.quantity;
    this.purchaseList.splice(this.purchaseList.indexOf(purchaseItem), 1);
    // console.log(this.purchaseList);
  }
  onFilesSelect(event: any) {
    // console.log(event);
    for (const file of event.target.files) {
      this.files.push(file);
      // console.log(file);
    }
  }
  onFileRemove(file: File) {
    this.files.splice(this.files.indexOf(file), 1);

  }
  onPurchase() {
    // console.log(f);
    if (this.purchaseList.length > 0) {
      // console.log(this.purchaseList);
      this.editFlag = false;
      if (this.files.length > 0) {
        this.commonService.uploadFiles(this.files).subscribe(
          (data: any) => {
            const invoice: PurchaseInvoice = {
              code: this.code,
              items: this.purchaseList,
              supplier: this.selectedSupplier,
              urls: data.urls
            };
            // Request of creating new purchase invoice goes here
            // console.log(invoice);
            this.generatePurchaseCode();
            this.purchaseService.createPurchaseInvoice(invoice).subscribe(
              (res: any) => {
                if (res.status) {
                  this.purchaseList = [];
                  this.total = 0;
                  this.files = [];
                  this.message.title = 'Success';
                  this.message.details = 'Items successfully purchased!!!';
                } else {
                  this.message.title = 'Failed';
                  this.message.details = 'Purchased failed due to invalid data or permission';
                }
                this.editFlag = true;
                this.statusFlug = true;
              },
              (error: any) => {
                this.message.title = 'Failed';
                this.message.details = 'Purchased failed due to invalid data or permission';
                this.editFlag = true;
              }
            );
          }
        );
      } else {
        const invoice: PurchaseInvoice = {
          code: this.code,
          items: this.purchaseList,
          supplier: this.selectedSupplier
        };
        // console.log(invoice);
        this.generatePurchaseCode();
        this.purchaseService.createPurchaseInvoice(invoice).subscribe(
          (res: any) => {
            // console.log(res);
            if (res.status) {
              this.purchaseList = [];
              this.total = 0;
              this.files = [];
              this.message.title = 'Success';
              this.message.details = 'Items successfully purchased!!!';
            } else {
              this.message.title = 'Failed';
              this.message.details = 'Purchased failed due to invalid data or permission';
            }
            this.editFlag = true;
            this.statusFlug = true;
          },
          (error: any) => {
            this.editFlag = true;
          }
        );
      }
    }
  }

  // For status
  onStatusClose() {
    this.statusFlug = false;
  }
  ngOnDestroy() {}

}

