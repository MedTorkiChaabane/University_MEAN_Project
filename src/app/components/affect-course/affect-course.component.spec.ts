import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectCourseComponent } from './affect-course.component';

describe('AffectCourseComponent', () => {
  let component: AffectCourseComponent;
  let fixture: ComponentFixture<AffectCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
