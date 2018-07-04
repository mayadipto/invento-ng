import {User} from './user.model';
import {Url} from './Url.model';
import {Customer} from './customer.model';
import {Sell} from './sell.model';

export interface SellInvoice {
  id?: string;
  code?: string;
  sell_by?: User;
  customer?: Customer;
  total_purchase_price?: number;
  total_sell_price?: number;
  sell_items?: Sell[];
  vat?: number;
  vat_amount?: number;
  files?: Url[];
  created_at?: string;
  updated_at?: string;
}





