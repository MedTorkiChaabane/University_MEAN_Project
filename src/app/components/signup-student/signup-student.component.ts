import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { TwilioService } from 'src/app/services/twilio.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  email: any = {};
  errorMsgEmail: string = "";
  errorMsgTel: string = "";
  signupForm: FormGroup;
  imagePreview: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private emailService: EmailService,
    private twilioService: TwilioService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: [""],
      tel: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      address: ["", [Validators.required, Validators.minLength(5)]],
      level: ["", [Validators.required]],
      img: [""],
    });
  }

  signupStudent() {
    this.signupForm.value.role = "Student";
    this.signupForm.value.status = "Not affected"
    this.userService.signupStudent(this.signupForm.value, this.signupForm.value.img).subscribe(
      (data) => {

        if (data.message == "0") {
          this.errorMsgEmail = "Email exists";
        } else if (data.message == "1") {
          this.errorMsgTel = "Tel exists";
          this.errorMsgEmail = "";
        } else {
          this.email.to = this.signupForm.value.email;
          this.email.tel = this.signupForm.value.tel;
          this.email.password = this.signupForm.value.password;
          this.emailService.sendEmail(this.email).subscribe();
          this.twilioService.sendMessage(this.signupForm.value.tel).subscribe();
          this.router.navigate(["login"]);
        }
      }
    );
  }
  // add-X.ts
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }



}
