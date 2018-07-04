import {Brand} from './brand.model';
import {ItemCategory} from './ItemCategory.model';

export interface Item {
  sl?: string;
  id?: string;
  code?: string;
  name?: string;
  brand?: Brand;
  category?: ItemCategory;
  quantity?: number;
  unit?: string;
  purchase_price?: number;
  discount?: number;
  sell_price?: number;
  created_at?: string;
  updated_at?: string;
}


