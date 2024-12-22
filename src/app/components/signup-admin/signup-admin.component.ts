import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { checkLength, isAlphabeticalWithSpace, isValidEmail, isValidTel } from 'src/app/shared/controlSignup';


@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  errorMsgEmail: string = "";
  errorMsgTel: string = "";
  admin: any = {};
  signupAdminForm: FormGroup;
  constructor(private router:Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  signupAdmin() {
    if(checkLength(this.admin.firstName,3) && isAlphabeticalWithSpace(this.admin.firstName) 
    && checkLength(this.admin.lastName,3) && isAlphabeticalWithSpace(this.admin.lastName) 
    && isValidEmail(this.admin.email) && checkLength(this.admin.password,6) 
    && isValidTel(this.admin.tel) && checkLength(this.admin.address,6)){
      this.admin.role = "admin";
      this.userService.signupAdmin(this.admin).subscribe(
        (data) => {
          if (data.message == "0") {
            this.errorMsgEmail = "Email exists";
          } else if (data.message == "1") {
            this.errorMsgTel = "Tel exists";
            this.errorMsgEmail = "";
          } else {
            console.log("Admin added with success")
            this.router.navigate(["login"]);
          }
      
        }
      );
  
}
}

}
