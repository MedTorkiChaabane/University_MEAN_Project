import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { generateId } from 'src/app/shared/generateId';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  imagePreview: any;
  addCourseForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private courseService: CourseService ) { }

  ngOnInit() {
    this.addCourseForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(6)]],
      modules: ["", [Validators.required]],
      price:["", [Validators.required]],
      img:[""],
    });
  }
  addCourse() {
    let idTeacher = localStorage.getItem("userId");
    this.addCourseForm.value.idTeacher = idTeacher;
    //service to save teacher course
    this.courseService.addCourse(this.addCourseForm.value, this.addCourseForm.value.img).subscribe( (data) =>{
      console.log("Course added", data.isAdded);
      this.router.navigate(["teacher"]);
    });
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addCourseForm.patchValue({ img: file });
    this.addCourseForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

}
