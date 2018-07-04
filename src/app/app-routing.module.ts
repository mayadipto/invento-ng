import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PurchaseComponent} from './purchase/purchase.component';
import {NewPurchsaeComponent} from './purchase/new-purchsae/new-purchsae.component';
import {PurchaseInvoiceListComponent} from './purchase/purchase-invoice-list/purchase-invoice-list.component';
import {PurchaseInvoiceDetailsComponent} from './purchase/purchase-invoice-details/purchase-invoice-details.component';
import {SellInvoiceListComponent} from './sells/sell-invoice-list/sell-invoice-list.component';
import {SellInvoiceDetailsComponent} from './sells/sell-invoice-details/sell-invoice-details.component';
import {NewSellInvoiceComponent} from './sells/new-sell-invoice/new-sell-invoice.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth-guard.service';
import {ExpenseInvoiceListComponent} from './expense/expense-invoice-list/expense-invoice-list.component';
import {ExpenseInvoiceDetailsComponent} from './expense/expense-invoice-details/expense-invoice-details.component';
import {NewExpenseComponent} from './expense/new-expense/new-expense.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'user/create', component: SignupComponent, canActivate: [AuthGuard]},
  {path: 'purchase', component: PurchaseInvoiceListComponent, canActivate: [AuthGuard]},
  {path: 'purchase/details/:id', component: PurchaseInvoiceDetailsComponent, canActivate: [AuthGuard]},
  {path: 'purchase/create', component: NewPurchsaeComponent, canActivate: [AuthGuard]},
  {path: 'sell/invoice/details/:id', component: SellInvoiceDetailsComponent, canActivate: [AuthGuard]},
  {path: 'sell/invoice', component: SellInvoiceListComponent, canActivate: [AuthGuard]},
  {path: 'sell/invoice/create', component: NewSellInvoiceComponent, canActivate: [AuthGuard]},
  {path: 'expense/invoice', component: ExpenseInvoiceListComponent, canActivate: [AuthGuard]},
  {path: 'expense/invoice/create', component: NewExpenseComponent, canActivate: [AuthGuard]},
  {path: 'expense/details/:id', component: ExpenseInvoiceDetailsComponent, canActivate: [AuthGuard]},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
