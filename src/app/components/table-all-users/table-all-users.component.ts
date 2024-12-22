import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-all-users',
  templateUrl: './table-all-users.component.html',
  styleUrls: ['./table-all-users.component.css']
})
export class TableAllUsersComponent implements OnInit {
  user:any={};
  searchForm: FormGroup;
  allUsersTab: any;
  searchedUsers: any;
  errorMsg:string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: [""],
    
    });
    this.userService.getAllUsersSortByRole().subscribe( (data) =>{
      this.allUsersTab = data.allUsersArray;
    });
  }
 
  displayUser(id:any){
    this.router.navigate([`profileUser/${id}`]);
  }
  editUser(id:any){
    this.router.navigate([`editUser/${id}`]);
  }
  deleteUser(id: any) {
    this.userService.deleteUserById(id).subscribe( (response) => {
      // isDeleted == true if deleted
      console.log("Here Response from B.L", response.isDeleted)
      this.userService.getAllUsersSortByRole().subscribe( (data) =>{
        this.allUsersTab = data.allUsersArray;
      });
    });
  }
  searchUsers(){
     this.userService.searchUserByName(this.user).subscribe( (response)=>{
        if(this.user.name){
            this.allUsersTab= response.searchUsersArray;
            this.errorMsg="No such user with this name!"
        }else{
          this.userService.getAllUsersSortByRole().subscribe (( data)=>{
            this.allUsersTab= data.allUsersArray;
          });
        } 
     });
  }

}
