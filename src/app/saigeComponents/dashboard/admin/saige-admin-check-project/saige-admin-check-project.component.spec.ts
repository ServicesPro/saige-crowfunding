import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeAdminCheckProjectComponent } from './saige-admin-check-project.component';

describe('SaigeAdminCheckProjectComponent', () => {
  let component: SaigeAdminCheckProjectComponent;
  let fixture: ComponentFixture<SaigeAdminCheckProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeAdminCheckProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeAdminCheckProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
