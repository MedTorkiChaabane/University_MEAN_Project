import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { MenuComponent } from './components/menu/menu.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { RegisterComponent } from './components/register/register.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { TableStudentsComponent } from './components/table-students/table-students.component';
import { TableTeachersComponent } from './components/table-teachers/table-teachers.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { TeacherStudentsComponent } from './components/teacher-students/teacher-students.component';
import { NoteComponent } from './components/note/note.component';
import { OpinionComponent } from './components/opinion/opinion.component';
import { StudentNoteComponent } from './components/student-note/student-note.component';
import { StudentOpinionComponent } from './components/student-opinion/student-opinion.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DisplayCourseComponent } from './components/display-course/display-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CourseComponent } from './components/course/course.component';
import { EventComponent } from './components/event/event.component';
import { WhiteSpacePipe } from './pipes/white-space.pipe';
import { TestComponent } from './components/test/test.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { SearchCourseComponent } from './components/search-course/search-course.component';
import { TeacherQuestionsComponent } from './components/teacher-questions/teacher-questions.component';
import { TeacherResultsComponent } from './components/teacher-results/teacher-results.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupParentsComponent } from './components/signup-parents/signup-parents.component';
import { TableAllUsersComponent } from './components/table-all-users/table-all-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { ChildNotesComponent } from './components/child-notes/child-notes.component';
import { AffectCourseComponent } from './components/affect-course/affect-course.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InterceptorService } from './services/interceptor.service';
import { DisplayProfileAdminComponent } from './components/display-profile-admin/display-profile-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SignupStudentComponent,
    SignupAdminComponent,
    SignupTeacherComponent,
    MenuComponent,
    BannerHomeComponent,
    CoursesComponent,
    RegisterComponent,
    ServicesComponent,
    TestimonialsComponent,
    EventsComponent,
    HomeComponent,
    DashboardAdminComponent,
    AddCourseComponent,
    TableStudentsComponent,
    TableTeachersComponent,
    DashboardTeacherComponent,
    TeacherCoursesComponent,
    TeacherStudentsComponent,
    NoteComponent,
    OpinionComponent,
    StudentNoteComponent,
    StudentOpinionComponent,
    DashboardStudentComponent,
    DisplayCourseComponent,
    EditCourseComponent,
    CourseComponent,
    EventComponent,
    WhiteSpacePipe,
    TestComponent,
    AddQuestionComponent,
    SearchCourseComponent,
    TeacherQuestionsComponent,
    TeacherResultsComponent,
    SignupParentsComponent,
    TableAllUsersComponent,
    EditUserComponent,
    SafeUrlPipe,
    DashboardParentComponent,
    ChildNotesComponent,
    AffectCourseComponent,
    StudentCourseComponent,
    SignupComponent,
    ProfileComponent,
    DisplayProfileAdminComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // modules responsables formulaire
    FormsModule,
    ReactiveFormsModule,
    // modules responsables des méthodes service.
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
