import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMinComponent } from './project-min.component';

describe('ProjectMinComponent', () => {
  let component: ProjectMinComponent;
  let fixture: ComponentFixture<ProjectMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
