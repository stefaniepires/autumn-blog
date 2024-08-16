import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostsService } from '../../services/posts.service';
import { DatePipe } from '@angular/common';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { PostsSearchComponent } from './posts-search/posts-search.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';


@Component({
  selector: 'app-posts-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, FontAwesomeModule, MatButtonModule, DatePipe, AdminNavComponent, PostsSearchComponent, MatCardModule, MatLabel,],
  templateUrl: './posts-dashboard.component.html',
  styleUrl: './posts-dashboard.component.scss'
})
export class PostsDashboardComponent implements OnInit {
  displayedColumns = signal(['Edit', 'Image', 'Title', 'Status', 'Category', 'Created', 'Updated']).asReadonly();
  posts = signal<any[]>([]);
  filteredPosts = signal<any[]>([]);

  constructor(
    private postsService: PostsService,
    private router: Router,
  ) {}

ngOnInit(): void {
    this.postsService.get().subscribe({
      next: (data) => this.posts.set(data),
      error: (err) => console.error('Error fetching posts:', err)
    });
  }

  addPost(): void {
    console.log('Navigating to add post');
    this.router.navigate(['/posts/new']);
  }


  editPost(postData: any): void {
    if (postData && postData._id) {
      this.router.navigate(['/posts/edit', postData._id], { state: { post: postData } });
    } else {
      console.error('Post ID is undefined or invalid:', postData);
    }
  }

  applyFilter(criteria: any): void {
    let filtered = this.posts().filter(post => {
      return (!criteria.title || post.title.toLowerCase().includes(criteria.title.toLowerCase())) &&
             (!criteria.date || new Date(post.createdAt).toISOString().split('T')[0] === criteria.date) &&
             (!criteria.status || post.status === criteria.status) &&
             (!criteria.category || post.categories.some((cat: any) => cat.name.toLowerCase().includes(criteria.category.toLowerCase())));
    });
    this.filteredPosts.set(filtered);
  }
}
