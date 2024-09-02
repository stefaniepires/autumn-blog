import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { HeroSectionComponent } from '../../home/hero-section/hero-section.component';
import { NavComponent } from '../../home/nav/nav.component';
import { BannerComponent } from '../../newsletter/banner/banner.component';
import { SideBlogContentComponent } from '../../side-blog-content/side-blog-content.component';
import { PostByCategoryComponent } from '../post-by-category/post-by-category.component';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [NavComponent, FooterComponent, HeroSectionComponent, BannerComponent, SideBlogContentComponent, PostByCategoryComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent {

}
