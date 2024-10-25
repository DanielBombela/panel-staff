import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntancesComponent } from './intances.component';

describe('IntancesComponent', () => {
  let component: IntancesComponent;
  let fixture: ComponentFixture<IntancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
