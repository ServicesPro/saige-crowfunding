import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeOaramsComponent } from './contribute-oarams.component';

describe('ContributeOaramsComponent', () => {
  let component: ContributeOaramsComponent;
  let fixture: ComponentFixture<ContributeOaramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeOaramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeOaramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
