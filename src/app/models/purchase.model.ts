import {Item} from './Item.model';
import {User} from './user.model';
import {Supplier} from './supplier.model';

export interface Purchase {
  id?: string;
  code?: string;
  item?: Item;
  quantity?: number;
  purchase_price?: number;
  sell_price?: number;
  supplier?: Supplier;
  purchase_by?: User;
  details?: string;
  created_at?: string;
  updated_at?: string;
}






