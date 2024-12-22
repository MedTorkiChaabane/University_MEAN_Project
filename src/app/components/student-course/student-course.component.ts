import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {
  courses: any=[];
  userId: string;
  teachers: any=[];
  constructor(
    private courseService: CourseService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    this.userService.getUserById(this.userId).subscribe( (data) =>{
      this.courseService.getStudentCourses(data.user).subscribe( (data)=>{
        this.courses= data.studentCoursesArray;
      });
    });
    
    this.userService.getAllTeachers().subscribe( (data) => {
      this.teachers = data.teachersArray;
     
    });

  }

  searchTeacher(id: any) {
    return this.teachers.find((elt: any) => { return elt._id == id });
  }

}
