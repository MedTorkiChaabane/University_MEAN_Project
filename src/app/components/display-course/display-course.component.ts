import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-course',
  templateUrl: './display-course.component.html',
  styleUrls: ['./display-course.component.css']
})
export class DisplayCourseComponent implements OnInit {
  idCourse: string;
  idTeacher: string;
  findedCourse: any={};
  findedTeacher: any={};
  image: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.idCourse = this.activatedRoute.snapshot.paramMap.get("id");
    this.idTeacher = localStorage.getItem("userId");
    this.courseService.getCourseById(this.idCourse).subscribe((data) => {
      this.findedCourse = data.course;
    });
    this.userService.getUserById(this.idTeacher).subscribe((data) => { 
      this.findedTeacher = data.user;
    });



  }


}
