import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPrivateListComponent } from './project-private-list.component';

describe('ProjectPrivateListComponent', () => {
  let component: ProjectPrivateListComponent;
  let fixture: ComponentFixture<ProjectPrivateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPrivateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPrivateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
