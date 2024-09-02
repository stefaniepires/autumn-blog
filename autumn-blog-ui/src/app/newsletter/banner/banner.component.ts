import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [  ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatLabel,
    MatInputModule,
    MatSortModule, MatCardModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  signupForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private newsletterService: NewsletterService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const { name, email } = this.signupForm.value;

    this.newsletterService.signUp(name, email).subscribe({
      next: (response) => {
        console.log('Sign up successful:', response);
        alert('Thank you for signing up for our newsletter!');
        this.signupForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error during sign up:', err);
        alert(`${err.message}`);
        this.isSubmitting = false;
      }
    });
  }
}
