import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.scss'
})
export class BlogCarouselComponent {
  blogPosts: any[] = [];
  carouselSlides: any[][] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    this.postsService.get().subscribe({
      next: (data) => {
        this.blogPosts = data;
        this.createCarouselSlides();
      },
      error: (err) => console.error('Error fetching posts:', err)
    });
  }

  createCarouselSlides(): void {
    const slides: any[][] = [];
    for (let i = 0; i < this.blogPosts.length - 2; i++) {
      slides.push(this.blogPosts.slice(i, i + 3));
    }
    this.carouselSlides = slides;
  }
}
