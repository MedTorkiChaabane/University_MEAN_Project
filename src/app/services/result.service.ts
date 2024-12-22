import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
 
  resultUrl: string = "http://localhost:3000/results";
  constructor(
    private httpClient: HttpClient,
  ) { }
  //1- service addResult: when student validate the test
  addResult(result: any) {
    return this.httpClient.post<{ isAdded: string }>(`${this.resultUrl}/addResult`, result);
  }
  //2- service getMyStudentResult: show a result of a student to  teacher
  getMyStudentResult(idTeacher: any){
    return this.httpClient.get<{myStudentsResultArray: any}>(`${this.resultUrl}/getMyStudentsResult/${idTeacher}`)
  }
  //3- service deleteResult: delete one result by teacher
  deleteResult(id:any){
    return this.httpClient.delete<{isDeleted: boolean}>(`${this.resultUrl}/deleteResult/${id}`)
  }

}
