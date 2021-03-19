import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeUserChangePasswordComponent } from './saige-user-change-password.component';

describe('SaigeUserChangePasswordComponent', () => {
  let component: SaigeUserChangePasswordComponent;
  let fixture: ComponentFixture<SaigeUserChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeUserChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeUserChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
