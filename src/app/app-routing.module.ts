import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { NoteComponent } from './components/note/note.component';
import { OpinionComponent } from './components/opinion/opinion.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { DisplayCourseComponent } from './components/display-course/display-course.component';
import { TestComponent } from './components/test/test.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { SearchCourseComponent } from './components/search-course/search-course.component';
import { SignupParentsComponent } from './components/signup-parents/signup-parents.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { AffectCourseComponent } from './components/affect-course/affect-course.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DisplayProfileAdminComponent } from './components/display-profile-admin/display-profile-admin.component';


const routes: Routes = [
  //http://localhost:4200/ => home Component will be displayed
  { path: "", component: HomeComponent },
  //http://localhost:4200/login => login Component will be displayed
  { path: "login", component: LoginComponent },
  //http://localhost:4200/signupAdmin => signup-admin Component will be displayed
  { path: "signupAdmin", component: SignupAdminComponent },
  //http://localhost:4200/signupTeacher => signup-teacher Component will be displayed
  { path: "signupTeacher", component: SignupTeacherComponent },
  //http://localhost:4200/signupStudent => signup-student Component will be displayed
  { path: "signupStudent", component: SignupStudentComponent },
  { path: "signupParent", component: SignupParentsComponent },
  { path: "admin", component: DashboardAdminComponent},
  { path: "teacher", component: DashboardTeacherComponent},
  { path: "addCourse", component: AddCourseComponent},
  { path: "profileUser/:id", component: DisplayProfileAdminComponent},
  { path: "note/:id", component: NoteComponent},
  { path: "opinion/:id", component: OpinionComponent},
  { path: "student", component: DashboardStudentComponent},
  { path: "editCourse/:id", component: EditCourseComponent},
  //http://localhost:4200/editUser => edit-user Component will be displayed
  { path: "editUser/:id", component: EditUserComponent},
  { path: "displayCourse/:id", component: DisplayCourseComponent},
  { path: "test", component: TestComponent},
  { path: "addQuestion", component: AddQuestionComponent},
  { path: "searchCourse", component: SearchCourseComponent},
  { path: "editProfile", component: ProfileComponent},
  { path: "parent", component: DashboardParentComponent},
  { path: "affectCourse/:id", component: AffectCourseComponent},
  { path: "signup", component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
