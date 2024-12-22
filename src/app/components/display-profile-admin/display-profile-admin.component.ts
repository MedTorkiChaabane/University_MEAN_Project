import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-profile-admin',
  templateUrl: './display-profile-admin.component.html',
  styleUrls: ['./display-profile-admin.component.css']
})
export class DisplayProfileAdminComponent implements OnInit {
  user: any ={};
  teachers: any;
  affectForm: FormGroup;
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data.user;
      console.log("Here user", this.user);
    });
    this.userService.getAllTeachers().subscribe((data) =>{
      this.teachers = data.teachersArray;
    });
  }
  affectStudent() { 
   this.user.status="Affected";
   this.userService.updateUser(this.user).subscribe( (data)=>{
      console.log("update", data.isUpdated);
      Swal.fire({ 
        icon: 'success',
        title: 'Student affected',
        showConfirmButton: false,
        timer: 3500
      }).then(()=>{
        this.router.navigate(["admin"]);
      });
   });
    
  }


}
