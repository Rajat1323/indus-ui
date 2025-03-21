import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalRemarksComponent } from './approval-remarks.component';

describe('ApprovalRemarksComponent', () => {
  let component: ApprovalRemarksComponent;
  let fixture: ComponentFixture<ApprovalRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalRemarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
