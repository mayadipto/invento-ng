import { Component, OnInit } from '@angular/core';
import {SellInvoice} from '../../models/sell-invoice.model';
import {Customer} from '../../models/customer.model';
import {Item} from '../../models/Item.model';
import {SellService} from '../sell.service';
import {PurchaseService} from '../../purchase/purchase.service';
import {Sell} from '../../models/sell.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-sell-invoice',
  templateUrl: './new-sell-invoice.component.html',
  styleUrls: ['./new-sell-invoice.component.css']
})
export class NewSellInvoiceComponent implements OnInit {
  sellInvoice: SellInvoice;
  customer: Customer;
  item: Item;
  sell: Sell;
  customerText = '';
  itemText = '';
  itemQuantity = 0;
  itemOptions: Item[] = [];
  customerOptions: Customer[] = [];
  constructor(private sellService: SellService,
              private router: Router,
              private purchaseService: PurchaseService) {
    this.initializeSell();
  }

  ngOnInit() {
  }
  generateSellCode() {
    return 'buy-' + Math.round(Math.random() * 1000) + Date.now() + 6 * 60;
  }

  onCustomerChange(customer: Customer) {
      this.customer = customer;
      console.log(this.customer);
      this.customerText = customer.contact_no;
      this.customerOptions = [];
  }
  onItemChange(item: Item) {
    this.item = item;
    this.itemQuantity = item.quantity;
    console.log(this.item);
    this.itemText = item.name;
    this.itemOptions = [];
  }

  getCustomerByContact() {
    if (this.customerText != this.customer.contact_no && this.customerText != null) {
      this.customer.contact_no = this.customerText;
      this.sellService.getCustomerByContact(this.customerText).subscribe(
        (result: any) => {
          this.customerOptions = result.data;
        }
      );
    }
  }

  getItemByCode() {
    if (this.itemText != this.item.code && this.itemText != null) {
      this.item.code = this.itemText;
      this.purchaseService.getItemsByName(this.itemText).subscribe(
        (result: any) => {
          this.itemOptions = result.data;
        }
      );
    }
  }

  onSellAdd(f) {
    // console.log(f);
    this.sell.item = this.item;
    this.itemQuantity -= this.sell.item.quantity;
    this.sell.discount = this.item.discount;
    if (!this.isExistsInInvoice(this.sell.item)) {
      this.sellInvoice.sell_items.push(this.sell);
    }
    console.log(this.sellInvoice);
  }
  isExistsInInvoice(item: Item) {
    console.log(item);
    console.log(this.sellInvoice);
    for (let sItem of this.sellInvoice.sell_items) {
      if (item.id === sItem.item.id) {
        sItem.item.quantity += item.quantity;
        return true;
      }
    }
    return false;
  }
  getTotalPrice(sellItem: Sell) {
    let t = (sellItem.item.sell_price * sellItem.item.quantity);
    const d = (sellItem.item.discount * t) / 100;
    t = t - d;
    const v = (t * this.sellInvoice.vat) / 100;
    return (t + v);
  }
  onDeleteSell(sellItem: Sell) {
    this.sellInvoice.sell_items.splice(this.sellInvoice.sell_items.indexOf(sellItem), 1);
    // this.sellInvoice.total_sell_price -= this.getTotalPrice(sellItem);
  }
  getGrandTotal() {
    let total = 0;
    for (const sellItem of this.sellInvoice.sell_items) {
      total += this.getTotalPrice(sellItem);
    }
    return total;
  }

  onSell() {
    this.sellInvoice.customer = this.customer;
    console.log(this.sellInvoice);
    this.sellService.createNewSell(this.sellInvoice).subscribe(
      (result: any) => {
        console.log(result);
        this.initializeSell();
        this.router.navigate(['sell/invoice/details/', result.invoice_id]);
      }
    );
  }
  initializeSell() {
    this.sellInvoice = {
      code: this.generateSellCode(),
      vat: 15,
      total_sell_price: 0,
      sell_items: []
    } ;
    this.customer = {name: '', contact_no: '', id: ''};
    this.sell = {details: ''};
    this.item = {name: ''};
  }

}
