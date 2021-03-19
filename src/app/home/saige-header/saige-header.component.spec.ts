import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaigeHeaderComponent } from './saige-header.component';

describe('SaigeHeaderComponent', () => {
  let component: SaigeHeaderComponent;
  let fixture: ComponentFixture<SaigeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaigeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaigeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
