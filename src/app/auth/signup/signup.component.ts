import { Component, OnInit } from '@angular/core';
import {user_roles, user_status} from '../../constants';
import {User} from '../../models/user.model';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  statusFlag = false;
  email = '_._';
  message = {
    title: '',
    details: ''
  };
  roles: any[];
  u_status: any[];
  newUser: User = {};
  constructor(private authService: AuthService) {
    this.roles = user_roles;
    this.u_status = user_status;
  }

  ngOnInit() {
  }
  createUser(f) {
    this.newUser.name = f.value.name;
    this.newUser.email = f.value.email;
    this.newUser.password = f.value.password;
    this.newUser.role = f.value.role;
    this.newUser.status = f.value.status;
    console.log(this.newUser);
    this.authService.signup(this.newUser).subscribe(
      (data: any) => {
        this.statusFlag = true;
        this.message.title = 'Successful';
        this.message.details = 'User created successfully';
      },
      (error: any) => {
        this.statusFlag = true;
        this.message.title = 'Failed';
        this.message.details = 'User can\'t be created';
        console.log(error);
      }
    );
  }
  checkEmail(email) {
    console.log(email);
    this.authService.checkUserByEmail(email).subscribe(
      (data: any) => {
        console.log(data);
        if (data.status === true) {
          this.email = email;
        }
      }
    );
  }
  // For status
  onStatusClose() {
    this.statusFlag = false;
  }
}
