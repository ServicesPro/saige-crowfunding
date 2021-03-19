import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeDashboardComponent } from './saige-dashboard.component';

describe('SaigeDashboardComponent', () => {
  let component: SaigeDashboardComponent;
  let fixture: ComponentFixture<SaigeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
