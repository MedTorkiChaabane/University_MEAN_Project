import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildNotesComponent } from './child-notes.component';

describe('ChildNotesComponent', () => {
  let component: ChildNotesComponent;
  let fixture: ComponentFixture<ChildNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
