import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private router: Router,
              public authService: AuthService) {}

  ngOnInit() {}

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }
  logout() {
    this.authService.logout().subscribe(
      (data: any) => {
        localStorage.clear();
        this.authService.user = {};
        this.router.navigate(['/']);
      }
    );
  }
}
