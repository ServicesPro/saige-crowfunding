import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdesBlockComponent } from './ides-block.component';

describe('IdesBlockComponent', () => {
  let component: IdesBlockComponent;
  let fixture: ComponentFixture<IdesBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdesBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
