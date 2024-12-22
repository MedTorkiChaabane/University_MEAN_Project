import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  passed: boolean = false;
  result: any = {};
  quiz: any = [];
  rightsAnswer: number = -1;
  msg: string = "";
  connectedUser: any = {};
  connectedUserId: any;
  allTeacherQuestions: any
  randomTestTab: any = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private questionService: QuestionService,
    private resultService: ResultService) { }

  ngOnInit() {

    //Récupération de l'id connectedUser
    this.connectedUserId = localStorage.getItem("userId");
    //Récuperation de l'obj connectedUser
    this.userService.getUserById(this.connectedUserId).subscribe((data) => {
      this.connectedUser = data.user;
      if (this.connectedUser.status == "Affected") {
        // Sélectionner toutes questions de mon professour
        this.questionService.getTeacherQuestions(this.connectedUser.idTeacher).subscribe((data) => {
          this.allTeacherQuestions = data.myQuestionsArray;
          console.log(this.allTeacherQuestions);
          // Génération de 4 questions aléatoire parmi les question de mon professeur
          for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * this.allTeacherQuestions.length);
            console.log("Here randomIndex", randomIndex);
            if (!this.randomTestTab.includes(this.allTeacherQuestions[randomIndex])) {
              this.randomTestTab.push(this.allTeacherQuestions[randomIndex]);
            } else {
              i--;
            }
          }
          this.quiz = this.randomTestTab;
          console.log("Here quiz", this.quiz);
        });
      } else {
        this.msg = "You are not affected!";
      }
    });

  }
 
  resultQuiz() {
    this.rightsAnswer = 0;
    for (let i = 0; i < this.quiz.length; i++) {
      if (this.quiz[i]._id == this.quiz[i].rightAnswer) {
        this.rightsAnswer += 1;
      }
    }
    this.passed = true;
    if (this.passed) {
      if ((this.quiz.length / this.rightsAnswer) <= 2) {
        this.msg = "You have passed your test successfully. Your score " + this.rightsAnswer + " / " + this.quiz.length;
      } else {
        this.msg = "You had fail the Test! Your score " + this.rightsAnswer + " / " + this.quiz.length;
      }
    }
    this.result.idStudent = this.connectedUser._id;
    this.result.idTeacher = this.connectedUser.idTeacher;
    this.result.score = this.rightsAnswer;
    this.result.total = this.quiz.length;
    this.resultService.addResult(this.result).subscribe();
    this.router.navigate(["test"]);
  }
  resultMsg() {
    if ((this.quiz.length / this.rightsAnswer) <= 2) {
      return "green";
    } else {
      return "red";
    }
  }
}
