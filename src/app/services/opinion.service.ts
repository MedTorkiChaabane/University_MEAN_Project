import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
 //Backend server address
  opinionUrl:string="http://localhost:3000/opinions"
  constructor(private httpClient: HttpClient) { }
   //1- Service addOpinion : add an opinion
   addOpinion(opinion:any){
    return this.httpClient.post<{isAdded: boolean}>(this.opinionUrl+"/addOpinion", opinion);
  }
  //2- Service getMyOpinions: get a teacher opinion about student
  getMyOpinions(idStudent:any){
    return this.httpClient.get<{MyOpinionsArray: any}>(`${this.opinionUrl}/getMyOpinions/${idStudent}`);
  }
}
