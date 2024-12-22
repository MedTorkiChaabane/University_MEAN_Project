import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  teachers: any;
  errorMsg:String="";
  changePasswordForm: FormGroup;
  validateForm: FormGroup;
  id: any;
  modifie: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.id = localStorage.getItem("userId");
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data.user;
      console.log("Here user", this.user);
    });

  }
  changePassword() {
    this.modifie = true;
  }
  validate(){
    console.log("here user profile", this.user);
    this.userService.changeUserPassword(this.user).subscribe ( (data) =>{
      console.log("here message from B.R", data.message);
      if(data.message =="Password changed"){
      Swal.fire({ 
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 3500
      }).then(()=>{
        this.router.navigate([""]);
      });
    }else {
      this.errorMsg = data.message;
    }
    });
  }
}
