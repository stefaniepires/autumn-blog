import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { NavComponent } from '../../home/nav/nav.component';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-single-page-posts',
  standalone: true,
  imports: [DatePipe, NavComponent, FooterComponent],
  templateUrl: './single-page-posts.component.html',
  styleUrl: './single-page-posts.component.scss'
})
export class SinglePagePostsComponent {
  postId = signal(this.route.snapshot.paramMap.get('id') || '').asReadonly();



  post = toSignal(this.postsService.getById(this.postId()));


  constructor(private postsService: PostsService, private route: ActivatedRoute) {}
}
