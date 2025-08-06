import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSave } from './confirm-save';

describe('ConfirmSave', () => {
  let component: ConfirmSave;
  let fixture: ComponentFixture<ConfirmSave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmSave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
