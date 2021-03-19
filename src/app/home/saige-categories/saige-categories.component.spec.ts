import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeCategoriesComponent } from './saige-categories.component';

describe('SaigeCategoriesComponent', () => {
  let component: SaigeCategoriesComponent;
  let fixture: ComponentFixture<SaigeCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
