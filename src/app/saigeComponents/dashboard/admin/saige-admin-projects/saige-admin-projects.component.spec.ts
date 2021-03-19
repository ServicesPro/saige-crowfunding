import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeAdminProjectsComponent } from './saige-admin-projects.component';

describe('SaigeAdminProjectsComponent', () => {
  let component: SaigeAdminProjectsComponent;
  let fixture: ComponentFixture<SaigeAdminProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeAdminProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeAdminProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
