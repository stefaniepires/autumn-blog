import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePagePostsComponent } from './home-page-posts.component';

describe('HomePagePostsComponent', () => {
  let component: HomePagePostsComponent;
  let fixture: ComponentFixture<HomePagePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePagePostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePagePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
