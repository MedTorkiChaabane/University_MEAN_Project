import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {
  errorMsgEmail: string = "";
  errorMsgTel: string = "";
  teacher: any = {};
  signupForm: FormGroup;
  cvUploaded: any;
  cvName:string="Please upload Your C.V!"
  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: [""],
      tel: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      address: ["", [Validators.required, Validators.minLength(5)]],
      speciality: ["", [Validators.required]],
      cv :["", [Validators.required]],
    });
  }
  signupTeacher() {
    this.signupForm.value.role = "Teacher";
    this.userService.signupTeacher(this.signupForm.value, this.signupForm.value.cv).subscribe(
      (data) => {
        if (data.message == "0") {
          this.errorMsgEmail = "Email exists";
        } else if (data.message == "1") {
          this.errorMsgTel = "Tel exists";
          this.errorMsgEmail = "";
        } else {
          console.log("Teacher added with success")
          this.router.navigate(["login"]);
        }
      }
    );

}
//
onSelectedFile(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.signupForm.patchValue({ cv: file });
  this.signupForm.updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
  this.cvUploaded = reader.result as string
  };
  this.cvName= file.name;
  reader.readAsDataURL(file);
  }
 
 


}
