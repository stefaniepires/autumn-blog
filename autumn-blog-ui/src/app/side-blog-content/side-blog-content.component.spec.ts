import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBlogContentComponent } from './side-blog-content.component';

describe('SideBlogContentComponent', () => {
  let component: SideBlogContentComponent;
  let fixture: ComponentFixture<SideBlogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBlogContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBlogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
