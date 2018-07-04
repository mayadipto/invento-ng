export const server = 'http://invento/api';
export const fileServer = 'http://invento';
export const user_name_key = btoa('name');
export const user_role_key = btoa('role');
export const user_status_key = btoa('status');
export const user_email_key = btoa('email');
export const user_id_key = btoa('id');

export const user_roles = [
  {value: '1', name: 'Customer'},
  {value: '2', name: 'Supplier'},
  {value: '3', name: 'Employee'},
  {value: '4', name: 'Moderator'},
  {value: '5', name: 'Admin'}
];

export const user_status = [
  {value: '0', name: 'Inactive'},
  {value: '1', name: 'Active'},
  {value: '2', name: 'Suspended'},
];
