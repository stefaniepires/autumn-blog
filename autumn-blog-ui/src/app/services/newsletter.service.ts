import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'http://localhost:5001/subscribers';

  constructor(private http: HttpClient) {}

  signUp(name: string, email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name, email };

    return this.http.post(`${this.apiUrl}/signup`, body, { headers });
  }
}
