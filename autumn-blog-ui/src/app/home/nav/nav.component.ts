import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  toggleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.classList.toggle('d-none');
      searchInput.focus();
    }
  }



}
