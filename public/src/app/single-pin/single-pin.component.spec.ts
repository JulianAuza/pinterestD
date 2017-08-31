import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePinComponent } from './single-pin.component';

describe('SinglePinComponent', () => {
  let component: SinglePinComponent;
  let fixture: ComponentFixture<SinglePinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
