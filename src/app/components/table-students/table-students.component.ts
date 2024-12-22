import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css']
})
export class TableStudentsComponent implements OnInit {
  studentsTab:any;
  constructor(private router:Router, 
    private userService: UserService) { }

  ngOnInit() {
   this.userService.getAllStudents().subscribe( (data)=>{
      this.studentsTab= data.studentsArray;
   });
  }
  affect(id:any){
    this.router.navigate([`affectStudent/${id}`]);
  }
  deleteStudent(id:any){
    this.userService.deleteUserById(id).subscribe( (response) =>{
       // isDeleted == true if deleted
       console.log("Here response from B.L", response.isDeleted);
      this.userService.getAllStudents().subscribe( (data)=> {
        this.studentsTab= data.studentsArray;
      });
    });
  }


}
