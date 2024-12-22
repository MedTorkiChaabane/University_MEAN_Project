import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-teachers',
  templateUrl: './table-teachers.component.html',
  styleUrls: ['./table-teachers.component.css']
})
export class TableTeachersComponent implements OnInit {
  teachersTab: any;
  studentsTab: any;
  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllTeachers().subscribe( (data) =>{
      this.teachersTab = data.teachersArray;
    });
    this.userService.getAllStudents().subscribe ( (data)=>{
      this.studentsTab = data.studentsArray;
    })
  }
  confirmTeacher(id: any) {
    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].id == id) {
    //     this.users[i].status = "Active";
    //     break;
    //   }
    // }
    // localStorage.setItem("users", JSON.stringify(this.users));
    // location.reload();
  }
  deleteTeacher(id: any) {
    this.userService.deleteUserById(id).subscribe( (response) => {
      // isDeleted == true if deleted
      console.log("Here Response from B.L", response.isDeleted)
      this.userService.getAllTeachers().subscribe( (data) => {
        this.teachersTab = data.teachersArray;
      });
    });
  }

}
