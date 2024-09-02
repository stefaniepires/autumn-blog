import { Component } from '@angular/core';
import { BlogCarouselComponent } from '../blog-carousel/blog-carousel.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [BlogCarouselComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
