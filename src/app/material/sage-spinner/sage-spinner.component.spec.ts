import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SageSpinnerComponent } from './sage-spinner.component';

describe('SageSpinnerComponent', () => {
  let component: SageSpinnerComponent;
  let fixture: ComponentFixture<SageSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SageSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
