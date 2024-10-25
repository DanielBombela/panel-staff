import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationGroupsComponent } from './information-groups.component';

describe('InformationGroupsComponent', () => {
  let component: InformationGroupsComponent;
  let fixture: ComponentFixture<InformationGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
