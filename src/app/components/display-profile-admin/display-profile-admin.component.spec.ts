import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProfileAdminComponent } from './display-profile-admin.component';

describe('DisplayProfileAdminComponent', () => {
  let component: DisplayProfileAdminComponent;
  let fixture: ComponentFixture<DisplayProfileAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProfileAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
