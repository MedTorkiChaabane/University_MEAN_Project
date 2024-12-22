import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questionUrl: string = "http://localhost:3000/questions"
  constructor(
    private httpClient: HttpClient,
  ) { }
  //1- service addQuestion: add one question by teacher
  addQuestion(question: any) {
    return this.httpClient.post<{ isAdded: boolean }>(this.questionUrl+"/addQuestion", question);
  }
  //2- service getTeacherQuestions (dashboard Teacher)
  getTeacherQuestions(idTeacher: any){
    return this.httpClient.get<{myQuestionsArray: any}>(`${this.questionUrl}/getTeacherQuestions/${idTeacher}`);
  }
  //3- service deleteQuestion: delete one question by teacher
  deleteQuestion(id: any){
    return this.httpClient.delete<{isDeleted: boolean}>(`${this.questionUrl}/deleteQuestion/${id}`);
  }
}
