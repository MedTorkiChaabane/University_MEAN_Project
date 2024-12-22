import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id: any;
  courses: any;
  user: any={};
  editUserForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastName: ["", [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: ["", [Validators.required, Validators.email]],

    })
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe( (data) => {
      this.user = data.user;
    });
  
  }

  editUser(){
    this.userService.updateUser(this.user).subscribe( (data)=>{
      console.log("update", data.isUpdated);
      this.router.navigate(["admin"]);
    })
    
  }

}
