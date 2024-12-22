import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOpinionComponent } from './student-opinion.component';

describe('StudentOpinionComponent', () => {
  let component: StudentOpinionComponent;
  let fixture: ComponentFixture<StudentOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
