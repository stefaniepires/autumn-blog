import { Component } from '@angular/core';
import { BannerComponent } from '../newsletter/banner/banner.component';
import { AboutComponent } from './about/about.component';
import { CurrentlyReadingComponent } from './currently-reading/currently-reading.component';
import { SpotifyPlaylistComponent } from './spotify-playlist/spotify-playlist.component';

@Component({
  selector: 'app-side-blog-content',
  standalone: true,
  imports: [AboutComponent, SpotifyPlaylistComponent, CurrentlyReadingComponent, BannerComponent],
  templateUrl: './side-blog-content.component.html',
  styleUrl: './side-blog-content.component.scss'
})
export class SideBlogContentComponent {

}
