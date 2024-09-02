import { Component, computed, EventEmitter, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { BlogCarouselComponent } from '../blog-carousel/blog-carousel.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [BlogCarouselComponent, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  categories = toSignal(this.categoriesService.getCategories());
  limitedCategories = computed(() => this.categories()?.slice(0, 5));


  constructor(private categoriesService: CategoriesService,  private router: Router) {}


}
