import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  emailUrl:string = "http://localhost:3000/emails";
  constructor(
    private httpClient: HttpClient,
  ) { }
  //1- service sendEmail: send an email contain user infos using nodemailer API at signupStudent
  sendEmail(email:any){
    return this.httpClient.post<{isSended: boolean}>(`${this.emailUrl}/sendEmail`, email);
  }
}
