import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeHowComponent } from './saige-how.component';

describe('SaigeHowComponent', () => {
  let component: SaigeHowComponent;
  let fixture: ComponentFixture<SaigeHowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeHowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeHowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
