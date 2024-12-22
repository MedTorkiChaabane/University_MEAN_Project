import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  //Backend server address
  noteUrl:string="http://localhost:3000/notes"
  constructor(private httpClient: HttpClient) { }
  //1- Service addNote : add a note
  addNote(note:any){
    return this.httpClient.post<{isAdded: boolean}>(this.noteUrl+"/addNote", note);
  }
  //2- Service getMyNotes: get a student notes given by teacher
  getMyNotes(idStudent:any){
    return this.httpClient.get<{MyNotesArray: any}>(`${this.noteUrl}/getMyNotes/${idStudent}`);
  }
}
