import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddJobCenterComponent } from './dialog-add-job-center.component';

describe('DialogAddJobCenterComponent', () => {
  let component: DialogAddJobCenterComponent;
  let fixture: ComponentFixture<DialogAddJobCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddJobCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddJobCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
