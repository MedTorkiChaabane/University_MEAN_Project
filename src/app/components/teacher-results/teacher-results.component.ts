import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-results',
  templateUrl: './teacher-results.component.html',
  styleUrls: ['./teacher-results.component.css']
})
export class TeacherResultsComponent implements OnInit {
  //Déclartion des variables
  idTeacher: string;
  myStudentsResult: any = [];
  students: any = [];
  //Création des instances
  constructor(
    private resultService: ResultService,
    private userService: UserService,
  ) { }
  //Inialisation: ngOnInit: méthode prédéfinis qui s'éxucute automatiquement lors de l'appel du componenet
  ngOnInit() {
    this.idTeacher = localStorage.getItem("userId");
    //Récupérer seulement les resultats de ses éléves
    this.resultService.getMyStudentResult(this.idTeacher).subscribe((data) => {
      this.myStudentsResult = data.myStudentsResultArray;
    });
    this.userService.getAllStudents().subscribe((data) => {
      this.students = data.studentsArray;
    });
  }
  searchStudentByResult(id: any) {
    return this.students.find((elt: any) => { return elt._id == id });
  }
  deleteResult(id: any) {
    this.resultService.deleteResult(id).subscribe((data) => {
      console.log("isDeleted:", data.isDeleted);
      this.resultService.getMyStudentResult(this.idTeacher).subscribe((data) => {
        this.myStudentsResult = data.myStudentsResultArray;
      });
    });
  }

}
