import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationEmployeesComponent } from './information-employees.component';

describe('InformationEmployeesComponent', () => {
  let component: InformationEmployeesComponent;
  let fixture: ComponentFixture<InformationEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
