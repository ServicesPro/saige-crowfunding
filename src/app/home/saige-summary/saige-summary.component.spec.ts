import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeSummaryComponent } from './saige-summary.component';

describe('SaigeSummaryComponent', () => {
  let component: SaigeSummaryComponent;
  let fixture: ComponentFixture<SaigeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
