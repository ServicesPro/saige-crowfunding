import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeUserProjectsComponent } from './saige-user-projects.component';

describe('SaigeUserProjectsComponent', () => {
  let component: SaigeUserProjectsComponent;
  let fixture: ComponentFixture<SaigeUserProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeUserProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
