import { Component } from '@angular/core';
import { BlogCarouselComponent } from '../blog-carousel/blog-carousel.component';

import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, BlogCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
