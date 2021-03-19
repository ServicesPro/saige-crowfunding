import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeChooseComponent } from './saige-choose.component';

describe('SaigeChooseComponent', () => {
  let component: SaigeChooseComponent;
  let fixture: ComponentFixture<SaigeChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
