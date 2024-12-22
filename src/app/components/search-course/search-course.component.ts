import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {
  course:any={};
  searchForm: FormGroup;
  findedCourses:any;
  constructor(
    private formBuilder: FormBuilder, 
    private courseService: CourseService,
    ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: ["", [Validators.required]],
    
    });
  }
  searchCourse(){
    this.findedCourses=[];
      this.courseService.searchCoursesByName(this.course).subscribe( (response)=>{
        this.findedCourses= response.searchCoursesArray;
      });
  }
}
