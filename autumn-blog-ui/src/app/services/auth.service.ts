import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role });
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove the token from local storage
    this.router.navigate(['/login']); // Redirect to the login page
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // signUpWithGoogle(token: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/google-signup`, { token });
  // }

  getCurrentUser(): any {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = atob(token.split('.')[1]);
        return JSON.parse(payload);
      }
    }
    return null;
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
