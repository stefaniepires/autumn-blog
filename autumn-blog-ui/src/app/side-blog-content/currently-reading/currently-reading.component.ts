import { Component } from '@angular/core';

@Component({
  selector: 'app-currently-reading',
  standalone: true,
  imports: [],
  templateUrl: './currently-reading.component.html',
  styleUrl: './currently-reading.component.scss'
})
export class CurrentlyReadingComponent {
  books = [
    {
      title: 'Practical Magic',
      author: 'Alice Hoffman',
      imageUrl: '../../../assets/images/practical-magic.jpg'
    },
    {
      title: 'The Secret History',
      author: 'Donna Tartt',
      imageUrl: '../../../assets/images/secret-history.jpg'
    },
    {
      title: 'The Night Circus',
      author: 'Erin Morgenstern',
      imageUrl: '../../../assets/images/night-circus.jpg'
    },
    {
      title: 'Mexican Gothic',
      author: 'Silvia Moreno-Garcia',
      imageUrl: '../../../assets/images/mexican-gothic.webp'
    }
  ];
}
