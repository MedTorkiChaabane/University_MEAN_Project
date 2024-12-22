import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupParentsComponent } from './signup-parents.component';

describe('SignupParentsComponent', () => {
  let component: SignupParentsComponent;
  let fixture: ComponentFixture<SignupParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
