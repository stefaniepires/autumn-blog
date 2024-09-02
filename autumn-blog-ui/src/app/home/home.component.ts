import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { BannerComponent } from '../newsletter/banner/banner.component';
import { HomePagePostsComponent } from '../posts/home-page-posts/home-page-posts.component';
import { SideBlogContentComponent } from '../side-blog-content/side-blog-content.component';
import { NavComponent } from './nav/nav.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, BannerComponent, HomePagePostsComponent, SideBlogContentComponent, FooterComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
