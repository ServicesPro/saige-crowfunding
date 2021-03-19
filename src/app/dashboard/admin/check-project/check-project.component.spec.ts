import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckProjectComponent } from './check-project.component';

describe('CheckProjectComponent', () => {
  let component: CheckProjectComponent;
  let fixture: ComponentFixture<CheckProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
