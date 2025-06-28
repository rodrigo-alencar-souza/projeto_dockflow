import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lable } from './lable';

describe('Lable', () => {
  let component: Lable;
  let fixture: ComponentFixture<Lable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
