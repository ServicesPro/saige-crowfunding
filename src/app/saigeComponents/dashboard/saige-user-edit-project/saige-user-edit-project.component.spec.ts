import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeUserEditProjectComponent } from './saige-user-edit-project.component';

describe('SaigeUserEditProjectComponent', () => {
  let component: SaigeUserEditProjectComponent;
  let fixture: ComponentFixture<SaigeUserEditProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeUserEditProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeUserEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
