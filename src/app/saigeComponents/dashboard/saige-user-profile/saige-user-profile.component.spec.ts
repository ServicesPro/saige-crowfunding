import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeUserProfileComponent } from './saige-user-profile.component';

describe('SaigeUserProfileComponent', () => {
  let component: SaigeUserProfileComponent;
  let fixture: ComponentFixture<SaigeUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
