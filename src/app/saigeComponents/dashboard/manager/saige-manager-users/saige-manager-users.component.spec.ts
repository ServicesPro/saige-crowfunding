import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeManagerUsersComponent } from './saige-manager-users.component';

describe('SaigeManagerUsersComponent', () => {
  let component: SaigeManagerUsersComponent;
  let fixture: ComponentFixture<SaigeManagerUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeManagerUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeManagerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
