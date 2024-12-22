import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tokenDecode:any;
  userId: string;
  userRole: string;
  firstName: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(
    private userService: UserService,
  ) { }


  ngOnInit() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.firstName = this.userService.getFirstName();
        this.userRole= this.userService.getUserRole();
      }
    );
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  logout() {
    this.userService.logout();
  }


}
