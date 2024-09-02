import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { AdminNavComponent } from '../../admin-nav/admin-nav.component';

@Component({
  selector: 'app-posts-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatLabel,
    MatInputModule,
    MatSortModule,
    MatDatepickerModule,
    MatCardModule,
    AdminNavComponent
  ],
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss']
})
export class PostsFormComponent implements OnInit {
  postForm: FormGroup;
  categories: any[] = [];
  post: any = null;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      status: ['', Validators.required],
      categories: [[], Validators.required],
      content: ['', Validators.required],
      featured:[false]
    });
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error fetching categories:', err),
    });

    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      this.postsService.getById(postId).subscribe({
        next: (post) => {
          this.post = post;
          this.populateForm();
        },
        error: (err) => console.error('Error fetching post:', err),
      });
    } else if (this.post) {
      this.populateForm();
    }
  }

  populateForm(): void {
    if (this.post) {
      this.postForm.patchValue({
        title: this.post.title,
        image: this.post.image,
        status: this.post.status,
        categories: this.post.categories.map((cat: any) => cat.name),
        content: this.post.content,
        featured: this.post.featured
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    const formData = this.postForm.value;

    if (this.categories && this.categories.length > 0) {
      const selectedCategoryIds = this.categories
        .filter(category => formData.categories.includes(category.name))
        .map(category => category._id);
      formData.categories = selectedCategoryIds;
    } else {
      console.error('No categories available or selected');
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      formData.author = currentUser.id;
    } else {
      console.error('Author is missing');
      return;
    }


    if (this.post && this.post._id) {

      this.postsService.updatePost(this.post._id, formData).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Error updating post:', err),
      });
    } else {

      this.postsService.createPost(formData).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Error creating post:', err),
      });
    }
  }


  onSoftDelete(): void {
    if (this.post) {
      this.postsService.updatePost(this.post._id, { status: 'Delete' }).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Error deleting post:', err),
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
