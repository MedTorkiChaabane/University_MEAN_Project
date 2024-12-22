import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public token: string;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  private fName: string;
  private userRole: string;
  private errorMsg: string;
  //Backend server address
  userUrl: string = "http://localhost:3000/users";
  //httpClient : un livreur
  constructor(
    private httpClient: HttpClient,
    private router: Router) { }
  //1- service signupStudent: add a student
  signupStudent(user: any, file: File) {
    let formData = new FormData;
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("role", user.role);
    formData.append("tel", user.tel);
    formData.append("address", user.address);
    formData.append("level", user.level);
    formData.append("status", user.status);
    formData.append("img", file);
    return this.httpClient.post<{ message: string }>(this.userUrl + "/signupStudent", formData);
  }
  //2- service signupTeacher: add a teacher
  signupTeacher(user: any, file: File) {
    let formData = new FormData;
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("role", user.role);
    formData.append("tel", user.tel);
    formData.append("address", user.address);
    formData.append("speciality", user.speciality);
    formData.append("cv", file);
    return this.httpClient.post<{ message: string }>(this.userUrl + "/signupTeacher", formData);
  }
  //3- service signupAdmin: add an admin
  signupAdmin(user: any) {
    return this.httpClient.post<{ message: string }>(this.userUrl + "/signupAdmin", user);
  }
  //4- service signupPrent: add a parent
  signupParent(user: any) {
    return this.httpClient.post<{ message: string }>(this.userUrl + "/signupParent", user);
  }
  //5- service getAllStudents: getAllStudents
  getAllStudents() {
    return this.httpClient.get<{ studentsArray: any }>(this.userUrl + "/getAllStudents");
  }
  //6- service getAllTeachers: getAllTeachers
  getAllTeachers() {
    return this.httpClient.get<{ teachersArray: any }>(this.userUrl + "/getAllTeachers");
  }
  //7- service getAllParents: getAllParents 
  getAllParents() {
    return this.httpClient.get<{ parentsArray: any }>(this.userUrl + "/getAllParents");
  }
  //8- service deleteStudentById: delete one student
  deleteUserById(id: any) {
    return this.httpClient.delete<{ isDeleted: boolean }>(`${this.userUrl}/deleteUser/${id}`);
  }
  //9- service getUserById: get obj user
  getUserById(id: any) {
    return this.httpClient.get<{ user: any }>(`${this.userUrl}/getUser/${id}`);
  }
  //10- service upadteUser: modifie user information (AffectStudentToTeacher)
  updateUser(newUser: any) {
    return this.httpClient.put<{ isUpdated: string }>(this.userUrl + "/updateUser", newUser);
  }
  //11- service login: login with phone number or email and password
  login(user: any) {
    return this.httpClient.post<{ message: string, user: any }>(this.userUrl + "/login", user);
  }
  //12- service getAllUsersSortByRole : dashboard admin
  getAllUsersSortByRole() {
    return this.httpClient.get<{ allUsersArray: any }>(this.userUrl + "/sortByRole");
  }
  //13- service getMyStudents: get students teacher dashboard teacher
  getMyStudents(id: any) {
    return this.httpClient.get<{ allMyStudentsArray: any }>(`${this.userUrl}/getMyStudents/${id}`);
  }
  //14- service getUserByTel: search one user by Tel
  getUserByTel(tel: any) {
    return this.httpClient.get<{ user: any }>(`${this.userUrl}/getUserByTel/${tel}`);
  }
  //15- service changeUserPassword: change password of a user dashboard(Teacher/Parent/Student)
  changeUserPassword(newUser: any) {
    return this.httpClient.put<{ message: string }>(this.userUrl + "/changeUserPassword", newUser);
  }
  //16- service searchUserByName: search one user by name (dashboard Admin)
  searchUserByName(user: any) {
    return this.httpClient.post<{ searchUsersArray: any }>(`${this.userUrl}/searchUsers`, user);
  }

  /************************Token********************* */
  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isUserAuth() {
    return this.isUserAuthenticated;
  }
  getFirstName() {
    return this.fName;
  }
  getUserRole() {
    return this.userRole;
  }
  getErrorMsg() {
    return this.errorMsg;
  }
  loginJwt(user: any) {
    this.httpClient.post<{ user: any, message: string }>(this.userUrl + "/loginJwt", user).subscribe(
      (res) => {
        if (res.message == "2") {
          const token = res.user.jwt;
          this.token = token;
          console.log("here result after login", token);
          this.isUserAuthenticated = true;
          this.fName = res.user.fName
          this.userRole = res.user.role;
          this.authStatusListener.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('userId', res.user.id);
          localStorage.setItem('firstName', res.user.fName);
          localStorage.setItem('userRole', res.user.role);
          this.router.navigate(['/']);
          this.errorMsg = "";
        } else {
          this.errorMsg = "Please check Email or TEL/PWD";
        }
      }
    )
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.userRole = "";
    this.fName = "";
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
