import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-parents',
  templateUrl: './signup-parents.component.html',
  styleUrls: ['./signup-parents.component.css']
})
export class SignupParentsComponent implements OnInit {
  signupForm: FormGroup;
  errorMsg:any="";
  errorNumChild: any="";
  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private userService:UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: [""],
      tel: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      address:["", [Validators.required, Validators.minLength(5)]],
      telChild: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    });
  }
  signupParent() {
    this.signupForm.value.role = "Parent";
    this.userService.signupParent(this.signupForm.value).subscribe(
      (data) => {
        console.log("Parent added", data.message);
      if(data.message == "1"){
        this.errorNumChild = "Please verifie your child number!";
      }else if(data.message == "0"){
        this.errorMsg ="Email existe!"
      }else{
        console.log("Parent added with success")
        this.router.navigate(["login"]);
      }
    
      }
    );

}

}
