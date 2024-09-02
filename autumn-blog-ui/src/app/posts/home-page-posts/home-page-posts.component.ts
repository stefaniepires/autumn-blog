import { Component, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home-page-posts',
  standalone: true,
  imports: [DatePipe, TruncatePipe, RouterModule],
  templateUrl: './home-page-posts.component.html',
  styleUrl: './home-page-posts.component.scss'
})
export class HomePagePostsComponent {
posts = toSignal(this.postsService.get())

constructor(private postsService: PostsService) {}
}
