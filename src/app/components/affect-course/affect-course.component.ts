import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affect-course',
  templateUrl: './affect-course.component.html',
  styleUrls: ['./affect-course.component.css']
})
export class AffectCourseComponent implements OnInit {
  userId: any;
  course: any = {};
  user: any = {};
  courses: any;
  affectForm: FormGroup;
  id: any;
  connectedUserId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data.user;
    });
    this.courseService.getMyCourses(this.userId).subscribe((data) => {
      this.courses = data.myCoursesArray;
    });
  }
  affectCourse() {
    this.user.courseTab.push(this.course.idCourse);
    this.userService.updateUser(this.user).subscribe((data) => {
      console.log("update", data.isUpdated);
      this.router.navigate(["teacher"]);
    });

  }


}
