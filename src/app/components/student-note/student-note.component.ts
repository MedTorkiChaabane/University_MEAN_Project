import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-note',
  templateUrl: './student-note.component.html',
  styleUrls: ['./student-note.component.css']
})
export class StudentNoteComponent implements OnInit {
  notes: any;
  userId: string;
  teachers: any=[];
  constructor(
    private noteService: NoteService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    this.noteService.getMyNotes(this.userId).subscribe( (data) =>{
      this.notes = data.MyNotesArray;
    });
    this.userService.getAllTeachers().subscribe( (data) => {
      this.teachers = data.teachersArray;
     
    });

  }

  searchTeacher(id: any) {
    return this.teachers.find((elt: any) => { return elt._id == id });
  }
  noteColor(value:any){
    if(value<=10){
      return "red";
    }else if (value>10 && value<=16){
      return "orange";
    }else{
      return "blue";
    }
  }
}
