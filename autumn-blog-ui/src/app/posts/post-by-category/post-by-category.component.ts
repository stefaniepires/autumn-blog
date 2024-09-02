import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavComponent } from '../../home/nav/nav.component';
import { PostsService } from '../../services/posts.service';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-post-by-category',
  standalone: true,
  imports: [DatePipe, TruncatePipe, RouterModule, NavComponent],
  templateUrl: './post-by-category.component.html',
  styleUrl: './post-by-category.component.scss'
})
export class PostByCategoryComponent {
  category = signal(decodeURIComponent(this.route.snapshot.paramMap.get('category') || '')).asReadonly()

  posts = toSignal(this.postsService.getPostsByCategory(this.category()));

  constructor(private postsService: PostsService, private route: ActivatedRoute) {}


}
