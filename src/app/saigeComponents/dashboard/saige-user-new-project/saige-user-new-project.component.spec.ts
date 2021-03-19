import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeUserNewProjectComponent } from './saige-user-new-project.component';

describe('SaigeUserNewProjectComponent', () => {
  let component: SaigeUserNewProjectComponent;
  let fixture: ComponentFixture<SaigeUserNewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeUserNewProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeUserNewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
