import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  idCourse: any;
  findedCourse: any;
  editCourseForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private courseService: CourseService) { }

  ngOnInit() {
    this.editCourseForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]*$/)]],
      description: ["", [Validators.required, Validators.minLength(6)]],
      modules: ["", [Validators.required]],

    });
    this.idCourse = this.activatedRoute.snapshot.paramMap.get("id");
    this.courseService.getCourseById(this.idCourse).subscribe(  (data) =>{
        this.findedCourse = data.course;
    });

  
  }

  editCourse(){
    this.courseService.editCourse(this.findedCourse).subscribe( (data) =>{
      console.log("Course updated", data.isUpdated);
      this.router.navigate(["teacher"]);
    });
    
  }

}
