import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private CommentURL="https://magyarorszagmap-default-rtdb.europe-west1.firebasedatabase.app/comments"
  constructor(private http: HttpClient) { }

  getComments (){
    return this.http.get(`${this.CommentURL}/.json`);
  }
  createComment(comment:{id:null, Helysegnev: any; Comment: any; Email: any }){
    return this.http.post(`${this.CommentURL}/.json`, comment);
  }
}
