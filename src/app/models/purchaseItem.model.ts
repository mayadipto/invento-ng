import {Item} from './Item.model';
import {Supplier} from './supplier.model';

export interface PurchaseItem {
  item?: Item;
  quantity?: number;
  purchase_price?: number;
  sell_price?: number;
  details?: string;
  files?: string[];
}
