import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { generateId } from 'src/app/shared/generateId';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  userId: string;
  addQuestionForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private router:Router,
    private questionService: QuestionService,
    ) { }

  ngOnInit() {
    this.addQuestionForm = this.formBuilder.group({
      question: ["", [Validators.required, Validators.minLength(3)]],
      answerOne: ["", [Validators.required]],
      answerTwo: ["", [Validators.required]],
      answerThree: ["", [Validators.required]],
      rightAnswer: ["", [Validators.required]],
    });
  }
  addQuestion(){
    this.userId= localStorage.getItem("userId");
    this.addQuestionForm.value.idTeacher= this.userId;
    //service to save a question from a test
    this.questionService.addQuestion(this.addQuestionForm.value).subscribe( (response) =>{
      console.log("Add question: ", response.isAdded);
      this.router.navigate(["teacher"]);
    }); 
  }


}
