import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpinionService } from 'src/app/services/opinion.service';
import { generateId } from 'src/app/shared/generateId';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {
  opinionForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router, 
    private activatedRoute:ActivatedRoute,
    private opinionService: OpinionService) { }


  ngOnInit() {
    this.opinionForm = this.formBuilder.group({
      subject: ["", [Validators.required]],
    })
  }
  giveOpinion(){
    let idStudent = this.activatedRoute.snapshot.paramMap.get("id");
    let idTeacher = localStorage.getItem("userId");
    this.opinionForm.value.idStudent = idStudent;
    this.opinionForm.value.idTeacher = idTeacher;
    this.opinionService.addOpinion(this.opinionForm.value).subscribe( (response) => {
      console.log("Opinion Added", response.isAdded);
      this.router.navigate(["teacher"]);
    });
  }

}
