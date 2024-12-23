import { Component, OnInit } from '@angular/core';
import { TwilioService } from 'src/app/services/twilio.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private twilioService: TwilioService,
  ) { }

  ngOnInit() {
  }

}
