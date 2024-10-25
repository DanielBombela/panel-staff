import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddUpdateJobCenterComponent } from './form-add-update-job-center.component';

describe('FormAddUpdateJobCenterComponent', () => {
  let component: FormAddUpdateJobCenterComponent;
  let fixture: ComponentFixture<FormAddUpdateJobCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddUpdateJobCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddUpdateJobCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
