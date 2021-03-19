import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeProjectsComponent } from './saige-projects.component';

describe('SaigeProjectsComponent', () => {
  let component: SaigeProjectsComponent;
  let fixture: ComponentFixture<SaigeProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
