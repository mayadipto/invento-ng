import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { NavTopComponent } from './navigation/nav-top/nav-top.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { SellsListComponent } from './sells/sells-list/sells-list.component';
import {PurchaseService} from './purchase/purchase.service';
import { NewPurchsaeComponent } from './purchase/new-purchsae/new-purchsae.component';
import {FormsModule} from '@angular/forms';
import {ItemCategoryService} from './categories/item-category.service';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import { PurchaseInvoiceListComponent } from './purchase/purchase-invoice-list/purchase-invoice-list.component';
import { PurchaseInvoiceDetailsComponent } from './purchase/purchase-invoice-details/purchase-invoice-details.component';
import { SellInvoiceListComponent } from './sells/sell-invoice-list/sell-invoice-list.component';
import {SellService} from './sells/sell.service';
import { SellInvoiceDetailsComponent } from './sells/sell-invoice-details/sell-invoice-details.component';
import { NewSellInvoiceComponent } from './sells/new-sell-invoice/new-sell-invoice.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthService} from './auth/auth.service';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth-guard.service';
import {AdminGuard} from './auth/admin-guard.service';
import { ExpenseInvoiceListComponent } from './expense/expense-invoice-list/expense-invoice-list.component';
import {ExpenseService} from './expense/expense.service';
import { ExpenseInvoiceDetailsComponent } from './expense/expense-invoice-details/expense-invoice-details.component';
import { NewExpenseComponent } from './expense/new-expense/new-expense.component';
import {CommonService} from './common/common.service';

@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    SideNavComponent,
    PurchaseComponent,
    PurchaseListComponent,
    SellsListComponent,
    NewPurchsaeComponent,
    PurchaseInvoiceListComponent,
    PurchaseInvoiceDetailsComponent,
    SellInvoiceListComponent,
    SellInvoiceDetailsComponent,
    NewSellInvoiceComponent,
    LoginComponent,
    SignupComponent,
    ExpenseInvoiceListComponent,
    ExpenseInvoiceDetailsComponent,
    NewExpenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    PurchaseService,
    ItemCategoryService,
    SellService,
    ExpenseService,
    CommonService,
    AuthService,
    AuthGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
