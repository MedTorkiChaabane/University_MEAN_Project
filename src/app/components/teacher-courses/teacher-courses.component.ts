import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {
  myCourses:any;
  idTeacher:String;
  constructor(
    private router:Router,
    private courseService: CourseService) { }

  ngOnInit() {
    this.idTeacher= localStorage.getItem("userId");
    this.courseService.getMyCourses(this.idTeacher).subscribe( (data)=>{
      this.myCourses = data.myCoursesArray;
    });
     
  }

  goToDisplay(id: any){
    this.router.navigate([`displayCourse/${id}`]);
  }
  
  goToEdit(id:any){
    this.router.navigate([`editCourse/${id}`]);
  }

  deleteCourse(id:any){
    this.courseService.deleteCourse(id).subscribe( (response) => {
      if(response.isDeleted == true){
        this.courseService.getMyCourses(this.idTeacher).subscribe ( (data) =>{
          this.myCourses = data.myCoursesArray;
        });
      }
    });
  }

}
