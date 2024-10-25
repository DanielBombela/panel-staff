import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationJobCenterComponent } from './information-job-center.component';

describe('InformationJobCenterComponent', () => {
  let component: InformationJobCenterComponent;
  let fixture: ComponentFixture<InformationJobCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationJobCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationJobCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
