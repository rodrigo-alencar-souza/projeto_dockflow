import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCatalogComponent } from './process-catalog.component';

describe('ProcessCatalogComponent', () => {
  let component: ProcessCatalogComponent;
  let fixture: ComponentFixture<ProcessCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
