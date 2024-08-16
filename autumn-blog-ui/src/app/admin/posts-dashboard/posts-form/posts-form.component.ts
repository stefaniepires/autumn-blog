import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-posts-form',
  standalone: true,
  imports: [ ReactiveFormsModule,],
  templateUrl: './posts-form.component.html',
  styleUrl: './posts-form.component.scss'
})
export class PostsFormComponent {
  postForm: FormGroup;
  isEditMode: boolean = false;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categories: [[], Validators.required],
      image: [''],
      status: ['Draft', Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.isEditMode = !!this.postId;
      if (this.isEditMode) {
        this.loadPostData();
      }
    });
  }

  loadPostData() {
    if (this.postId) {
      this.postsService.getById(this.postId).subscribe(post => {
        this.postForm.patchValue(post);
      });
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      if (this.isEditMode) {
        this.postsService.updatePost(this.postId!, this.postForm.value).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.postsService.createPost(this.postForm.value).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
