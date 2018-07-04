import {User} from './user.model';
import {Supplier} from './supplier.model';
import {PurchaseItem} from './purchaseItem.model';
import {Url} from './Url.model';

export interface PurchaseInvoice {
  id?: string;
  code?: string;
  items?: PurchaseItem[];
  total_price?: string;
  purchase_by?: User;
  supplier?: Supplier;
  urls?: Url[];
  created_at?: string;
  updated_at?: string;
}



