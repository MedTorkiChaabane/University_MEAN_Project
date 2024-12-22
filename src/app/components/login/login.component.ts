import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg: string;
  user: any = {};
  loginForm: FormGroup;
  constructor(
    private userService:UserService,) { }

  ngOnInit() {
  }
  login() {
    // if (this.user.password && (this.user.email || this.user.tel)) {
    //   console.log("ok");
    //   this.userService.login(this.user).subscribe(
    //     (data) => {
    //       console.log("here message", data.message);
    //       console.log("here obj", data.user);
    //       if (data.message == "2") {
    //         localStorage.setItem("userId", data.user.id);
    //         localStorage.setItem("userRole", data.user.role);
    //        (data.user.role == "admin")?
    //           this.router.navigate(["admin"]): this.router.navigate([`editProfile`]);
    //       } else {
    //         this.errorMsg = "Please check Email or TEL/PWD ";
    //       }
    //     }
    //   );
    // }
    if (this.user.password && (this.user.email || this.user.tel)) {
      this.userService.loginJwt(this.user); 
      this.errorMsg=this.userService.getErrorMsg();
    }
   
  }
}
