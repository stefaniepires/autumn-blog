import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/auth/';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          const token = response.token;

          const decodedToken = this.decodeToken(token);

          if (decodedToken && decodedToken.role === 'admin') {
            localStorage.setItem('adminToken', token);
          } else {
            localStorage.setItem('token', token);
          }
        } else {
          console.error('Invalid login response:', response);
        }
      })
    );
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    this.router.navigate(['/login']);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  getCurrentUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      if (Date.now() >= expiry) {
        alert('Your session has expired. Please log in again.');
        this.router.navigate(['/login']);
        return null;
      }
      return payload;
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    return !!token;
  }

  private decodeToken(token: string): any {
    try {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
}
