import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeFeaturesComponent } from './saige-features.component';

describe('SaigeFeaturesComponent', () => {
  let component: SaigeFeaturesComponent;
  let fixture: ComponentFixture<SaigeFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
