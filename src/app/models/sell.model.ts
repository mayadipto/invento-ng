import {Item} from './Item.model';

export interface Sell {
  id?: string;
  item?: Item;
  quantity?: number;
  purchase_price?: number;
  sell_price?: number;
  discount?: number;
  details?: string;
  created_at?: string;
  updated_at?: string;
}
