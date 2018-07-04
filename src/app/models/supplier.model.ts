import {User} from './user.model';

export interface Supplier {
  sl?: number;
  id?: string;
  name?: string;
  code?: string;
  user?: User;
  address?: string;
  email?: string;
  contact_no?: string;
  details?: string;
  image?: string;
}
