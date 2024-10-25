import { ComponentFixture, TestBed } from '@angular/core/testing';
import JobCentersComponent from './job-centers.component';


describe('JobCentersComponent', () => {
  let component: JobCentersComponent;
  let fixture: ComponentFixture<JobCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCentersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
