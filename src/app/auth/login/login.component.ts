import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {user_email_key, user_id_key, user_name_key, user_role_key, user_status_key} from '../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  statusFlag = false;
  message = {
    title: '',
    details: ''
  };
  constructor(private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/sell/invoice']);
    }
  }
  login(f) {
    const user: User = {};
    user.email = f.value.email;
    user.password = f.value.password;
    this.authService.login(user).subscribe(
      (data: any) => {
        this.authService.token = data.access_token;
        localStorage.setItem('token', data.access_token);
        this.authService.getUserInfo().subscribe(
          (result: any) => {
            // console.log(result);
            localStorage.setItem('user_name', btoa(result.name));
            localStorage.setItem('user_role', btoa(result.role));
            localStorage.setItem('user_status', btoa(result.status));
            localStorage.setItem('user_email', btoa(result.email));
            localStorage.setItem('user_id', btoa(result.id));
            const loggedUser: User = {
              name: result.name,
              email: result.email,
              role: result.role,
              status: result.status,
              id: result.id
            };
            this.authService.user = loggedUser;

            this.router.navigate(['/sell/invoice']);
          }
        );
      },
      (error) => {
        this.statusFlag = true;
        this.message.title = 'Failed to signin';
        this.message.details = 'Email or password didn\'t match';
      }
    );
    // console.log(user);
  }
  // For status
  onStatusClose() {
    this.statusFlag = false;
  }

}
