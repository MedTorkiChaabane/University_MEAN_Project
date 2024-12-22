import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-child-notes',
  templateUrl: './child-notes.component.html',
  styleUrls: ['./child-notes.component.css']
})
export class ChildNotesComponent implements OnInit {
  notes: any;
  userId: string;
  teachers: any = [];
  students: any= [];
  constructor(
    private noteService: NoteService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.userService.getUserById(this.userId).subscribe((parent) => {
      this.userService.getUserByTel(parent.user.telChild).subscribe( (student) => {
        this.noteService.getMyNotes(student.user._id).subscribe( (data)=>{
          this.notes = data.MyNotesArray;
        });
      });
    });
    this.userService.getAllTeachers().subscribe((data) => {
      this.teachers = data.teachersArray;
    });
    this.userService.getAllStudents().subscribe ( (data)=>{
      this.students = data.studentsArray;
    });
  }

  searchTeacher(id: any) {
    return this.teachers.find((elt: any) => { return elt._id == id });
  }
  searchStudent(id: any) {
    return this.students.find((elt: any) => { return elt._id == id });
  }
  noteColor(value: any) {
    if (value <= 10) {
      return "red";
    } else if (value > 10 && value <= 16) {
      return "orange";
    } else {
      return "blue";
    }
  }

}
