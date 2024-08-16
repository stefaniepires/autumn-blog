import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.scss'
})
export class BlogCarouselComponent {
  blogPosts = [
    {
      title: 'Pumpkin Spice Delights',
      date: '08-16-2022',
      categories: ['Recipes', 'Fall'],
      image: '../../assets/test/latte.png'
    },
    {
      title: 'Autumn Adventures',
      date: '08-15-2022',
      categories: ['Travel'],
      image: 'assets/test/adventure.png'
    },
    {
      title: 'Cozy Fall Reads',
      date: '08-14-2022',
      categories: ['Books', 'Fall'],
      image: 'assets/test/fashion.png'
    }
  ];
}
