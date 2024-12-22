import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-teacher-questions',
  templateUrl: './teacher-questions.component.html',
  styleUrls: ['./teacher-questions.component.css']
})
export class TeacherQuestionsComponent implements OnInit {
  //Déclartion des variables
  myQuestions: any = [];
  userId: string;
  //Création des instances
  constructor(
    private router: Router,
    private questionService: QuestionService,
  ) { }
  //Inialisation: ngOnInit: méthode prédéfinis qui s'éxucute automatiquement lors de l'appel du componenet
  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.questionService.getTeacherQuestions(this.userId).subscribe((data) => {
      this.myQuestions = data.myQuestionsArray;
    });

  }

  deleteQuestion(id: any) {
    this.questionService.deleteQuestion(id).subscribe((response) => {
      console.log("question deleted", response.isDeleted);
      this.questionService.getTeacherQuestions(this.userId).subscribe((data) => {
        this.myQuestions = data.myQuestionsArray;
      });
    });
  }

}
