import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeUserChangeEmailComponent } from './saige-user-change-email.component';

describe('SaigeUserChangeEmailComponent', () => {
  let component: SaigeUserChangeEmailComponent;
  let fixture: ComponentFixture<SaigeUserChangeEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeUserChangeEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeUserChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
