import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteForm: FormGroup;
  constructor(
     private formBuilder: FormBuilder,
     private router: Router,
     private activatedRoute: ActivatedRoute,
     private noteService: NoteService) { }


  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      value: ["", [Validators.required]],
    })
  }
  giveNote() {
    let idStudent = this.activatedRoute.snapshot.paramMap.get("id");
    let idTeacher = localStorage.getItem("userId");
    this.noteForm.value.idStudent = idStudent;
    this.noteForm.value.idTeacher = idTeacher;
    this.noteService.addNote(this.noteForm.value).subscribe ( (response) =>{
        console.log("Note added", response.isAdded);
        this.router.navigate(["teacher"]);
    });
  }

}
