import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeProjectsListComponent } from './saige-projects-list.component';

describe('SaigeProjectsListComponent', () => {
  let component: SaigeProjectsListComponent;
  let fixture: ComponentFixture<SaigeProjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeProjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
