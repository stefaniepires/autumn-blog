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
import {  MatLabel } from '@angular/material/form-field';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-posts-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, FontAwesomeModule, MatButtonModule, DatePipe, AdminNavComponent, PostsSearchComponent, MatCardModule, MatLabel,MatChipsModule, MatChipListbox],
  templateUrl: './posts-dashboard.component.html',
  styleUrl: './posts-dashboard.component.scss'
})
export class PostsDashboardComponent implements OnInit {
  displayedColumns = signal(['Edit', 'Image', 'Title', 'Status', 'Category', 'Featured','Created', 'Updated']).asReadonly();
  posts = signal<any[]>([]);
  filteredPosts = signal<any[]>([]);

  constructor(
    private postsService: PostsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.postsService.get().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.filteredPosts.set(data);
      },
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
    console.log('Filter criteria:', criteria);

    let filtered = this.posts().filter(post => {
        console.log('Post:', post);

        const createdStartDate = criteria.createdStartDate ? new Date(criteria.createdStartDate) : null;
        const createdEndDate = criteria.createdEndDate ? new Date(new Date(criteria.createdEndDate).setHours(23, 59, 59, 999)) : null;
        const updatedStartDate = criteria.updatedStartDate ? new Date(criteria.updatedStartDate) : null;
        const updatedEndDate = criteria.updatedEndDate ? new Date(new Date(criteria.updatedEndDate).setHours(23, 59, 59, 999)) : null;

        const createdDateMatch = (!createdStartDate || new Date(post.createdAt) >= createdStartDate) &&
                                 (!createdEndDate || new Date(post.createdAt) <= createdEndDate);
        const updatedDateMatch = (!updatedStartDate || new Date(post.updatedAt) >= updatedStartDate) &&
                                 (!updatedEndDate || new Date(post.updatedAt) <= updatedEndDate);
        const titleMatch = !criteria.title || post.title.toLowerCase().includes(criteria.title.toLowerCase());

        const statusMatch = !criteria.status || criteria.status === 'All'
          ? (post.status === 'Active' || post.status === 'Draft')
          : post.status === criteria.status;

        const categoryMatch = !criteria.category ||
          post.categories.some((cat: any) => cat.name.toLowerCase().includes(criteria.category.toLowerCase()));

        const featuredMatch = criteria.featured === '' || criteria.featured === null || criteria.featured === undefined
          ? true
          : post.featured === criteria.featured;

        console.log('Filtering by Featured: ', {
          postFeatured: post.featured,
          criteriaFeatured: criteria.featured,
          match: post.featured === criteria.featured
        });

        return createdDateMatch && updatedDateMatch && titleMatch && statusMatch && categoryMatch && featuredMatch;
    });

    console.log('Filtered posts:', filtered);
    this.filteredPosts.set(filtered);
}


}
