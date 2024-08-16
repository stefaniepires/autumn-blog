import { Component } from '@angular/core';
import { PostsDashboardComponent } from '../../posts-dashboard/posts-dashboard.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [PostsDashboardComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {

}
