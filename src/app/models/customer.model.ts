import {Url} from './Url.model';
import {User} from './user.model';

export interface Customer {
  id?: string;
  name?: string;
  user?: User;
  code?: string;
  address?: string;
  contact_no?: string;
  email?: string;
  details?: string;
  image?: Url;
  created_at?: string;
  updated_at?: string;
}
