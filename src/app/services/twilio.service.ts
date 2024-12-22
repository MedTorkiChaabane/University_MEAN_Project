import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {
  //Backend server address
  twilioUrl: string = "http://localhost:3000/twilio";
  constructor(
    private httpClient: HttpClient,
  ) { }
  //1- service sendMessage: send a phone message using twilio API at signupStudent
  sendMessage(tel: any) {
    return this.httpClient.get<{ message: string }>(this.twilioUrl + "/sendMessage/" + tel);
  }
}
