import { Component } from '@angular/core';
import { BlogCarouselComponent } from '../blog-carousel/blog-carousel.component';
import { FooterComponent } from '../footer/footer.component';
import { BannerComponent } from '../newsletter/banner/banner.component';
import { HomePagePostsComponent } from '../posts/home-page-posts/home-page-posts.component';
import { AboutComponent } from '../side-blog-content/about/about.component';
import { SideBlogContentComponent } from '../side-blog-content/side-blog-content.component';

import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, BlogCarouselComponent, BannerComponent, HomePagePostsComponent, SideBlogContentComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
