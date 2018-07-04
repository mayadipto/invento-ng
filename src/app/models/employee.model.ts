import {User} from './user.model';

export interface Employee {
  id?: string;
  name?: string;
  code?: string;
  father?: string;
  mother?: string;
  designation?: string;
  present_address?: string;
  permanent_address?: string;
  email?: string;
  contact_no?: string;
  district?: string;
  nid?: string;
  religion?: string;
  dob?: string;
  image?: string;
  other_details?: string;
  user_account?: User;
  created_at?: string;
  updated_at?: string;
}
