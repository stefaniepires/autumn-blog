import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:5001/posts/';

  constructor(private http: HttpClient) {}


  get(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  createPost(postData: any): Observable<any> {
    return this.http.post(this.apiUrl, postData);
  }

  updatePost(id: string, postData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, postData);
  }

}
