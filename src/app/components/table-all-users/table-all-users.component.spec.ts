import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAllUsersComponent } from './table-all-users.component';

describe('TableAllUsersComponent', () => {
  let component: TableAllUsersComponent;
  let fixture: ComponentFixture<TableAllUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAllUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
