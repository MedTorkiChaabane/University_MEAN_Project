import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl: string = "http://localhost:3000/courses";
  constructor(private httpClient: HttpClient) { }
  //1- service addCourse: add a course
  addCourse(course: any, file: File) {
    let formData = new FormData;
    formData.append("name", course.name);
    formData.append("description", course.description);
    formData.append("modules", course.modules);
    formData.append("price", course.price);
    formData.append("idTeacher", course.idTeacher);
    formData.append("img", file);
    return this.httpClient.post<{ isAdded: boolean }>(this.courseUrl + "/addCourse", formData);
  }
  //2- service getTeacherCourses: get all teacher courses
  getMyCourses(idTeacher: any) {
    return this.httpClient.get<{ myCoursesArray: any }>(`${this.courseUrl}/getMyCourses/${idTeacher}`)
  }
  //3- service getCourseById: get one course
  getCourseById(id: any) {
    return this.httpClient.get<{ course: any }>(`${this.courseUrl}/getCourseById/${id}`);
  }
  //4- service editCourse: edit one course
  editCourse(newCourse: any) {
    return this.httpClient.put<{ isUpdated: boolean }>(`${this.courseUrl}/editCourse`, newCourse);
  }
  //5- service deleteCourse: delete one course by teacher.
  deleteCourse(id: any) {
    return this.httpClient.delete<{ isDeleted: boolean }>(`${this.courseUrl}/deleteCourse/${id}`);
  }
  //6- service getStudentCourses: recupérer courseTab du l'objet Student (dashboard Student)
  getStudentCourses(student: any) {
    return this.httpClient.post<{ studentCoursesArray: any, message: string }>(`${this.courseUrl}/studentCourses`, student);
  }
  //7- service getAllCourses: component courses (dashboard Teacher)
  getAllCourses() {
    return this.httpClient.get<{ coursesArray: any, message: string }>(`${this.courseUrl}/getAll`);
  }
  //8 service search course by name: student can search course by name
  searchCoursesByName(course: string) {
    return this.httpClient.post<{ searchCoursesArray: any }>(`${this.courseUrl}/searchCourse/`, course);
  }
}
