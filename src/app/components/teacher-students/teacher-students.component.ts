import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //Module responsable de routing(navigation entre les pages)
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.css']
})
export class TeacherStudentsComponent implements OnInit {
  //Déclartion des variables
  myStudents: any;
  userId: String;
  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    //Récupérer seulement les users ayant le role "student" et l'idTeacher connecté
    this.userId = localStorage.getItem("userId");
    this.userService.getMyStudents(this.userId).subscribe((data) => {
      this.myStudents = data.allMyStudentsArray;
    });


  }
  //Méthode qui permet le routing vers note en récupérant l'idStuent
  giveNote(id: any) {
    this.router.navigate([`note/${id}`]);
  }
  // Méthode qui permet le routing vers opinion en récupérant l'idStudent
  giveOpinion(id: any) {
    this.router.navigate([`opinion/${id}`]);
  }
  affectCourse(id: any){
    this.router.navigate([`affectCourse/${id}`]);
  }
}
