import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRegistrationComponent } from './process-registration.component';

describe('ProcessRegistrationComponent', () => {
  let component: ProcessRegistrationComponent;
  let fixture: ComponentFixture<ProcessRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
