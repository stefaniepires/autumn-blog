import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePagePostsComponent } from './single-page-posts.component';

describe('SinglePagePostsComponent', () => {
  let component: SinglePagePostsComponent;
  let fixture: ComponentFixture<SinglePagePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePagePostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePagePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
