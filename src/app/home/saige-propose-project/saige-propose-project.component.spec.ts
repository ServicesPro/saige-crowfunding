import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeProposeProjectComponent } from './saige-propose-project.component';

describe('SaigeProposeProjectComponent', () => {
  let component: SaigeProposeProjectComponent;
  let fixture: ComponentFixture<SaigeProposeProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeProposeProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeProposeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
