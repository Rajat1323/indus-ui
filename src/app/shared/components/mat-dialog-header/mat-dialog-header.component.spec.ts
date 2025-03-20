import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogHeaderComponent } from './mat-dialog-header.component';

describe('MatDialogHeaderComponent', () => {
  let component: MatDialogHeaderComponent;
  let fixture: ComponentFixture<MatDialogHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
