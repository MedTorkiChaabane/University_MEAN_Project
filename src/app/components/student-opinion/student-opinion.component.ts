import { Component, OnInit } from '@angular/core';
import { OpinionService } from 'src/app/services/opinion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-opinion',
  templateUrl: './student-opinion.component.html',
  styleUrls: ['./student-opinion.component.css']
})
export class StudentOpinionComponent implements OnInit {
  opinions: any;
  userId:string;
  teachers:any=[];
  constructor(
    private opinionService: OpinionService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userId=localStorage.getItem("userId");
    this.opinionService.getMyOpinions(this.userId).subscribe( (data) =>{
      this.opinions = data.MyOpinionsArray;
    });
    
    this.userService.getAllTeachers().subscribe( (data) => {
      this.teachers = data.teachersArray;
     
    });
  }
 
  searchTeacher(id: any) {

    return this.teachers.find((elt: any) => { return elt._id == id });

  }
}
