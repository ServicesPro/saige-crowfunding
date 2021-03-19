import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributePayementComponent } from './contribute-payement.component';

describe('ContributePayementComponent', () => {
  let component: ContributePayementComponent;
  let fixture: ComponentFixture<ContributePayementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributePayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
