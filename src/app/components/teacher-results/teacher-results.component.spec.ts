import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherResultsComponent } from './teacher-results.component';

describe('TeacherResultsComponent', () => {
  let component: TeacherResultsComponent;
  let fixture: ComponentFixture<TeacherResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
