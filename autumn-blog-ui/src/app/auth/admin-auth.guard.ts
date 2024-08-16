import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser(); // Assume this method returns the logged-in user with role info

    if (user && user.role === 'admin') {
      return true;
    }

    // If not an admin, redirect to home or login page
    this.router.navigate(['/home']);
    return false;
  }
}
