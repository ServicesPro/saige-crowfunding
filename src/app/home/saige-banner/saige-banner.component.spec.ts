import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeBannerComponent } from './saige-banner.component';

describe('SaigeBannerComponent', () => {
  let component: SaigeBannerComponent;
  let fixture: ComponentFixture<SaigeBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
