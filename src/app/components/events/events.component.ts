import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:any;
  constructor() { }

  ngOnInit() {
    this.events=[
      {day:"07",month:"January",image:"assets/images/event_1.jpg",title:"Student Festival",place:"Grand Central Park",description:"Nothing about event planning is simple, but advertising and promoting can sometimes be the most daunting parts of the job."},
      {day:"10",month:"Mars",image:"assets/images/event_2.jpg",title:"Open day in the Univesrsity campus",place:"University Park",description:"Academic events are an integral part of university life, offering students and faculty members the opportunity to engage with leading experts in various fields."},
      {day:"15",month:"October",image:"assets/images/event_3.jpg",title:"Student Graduation Ceremony",place:"University Audithoriom",description:"Social events such as dances, parties, and other gatherings also play a vital role in university life."}
    ];
  }

}
