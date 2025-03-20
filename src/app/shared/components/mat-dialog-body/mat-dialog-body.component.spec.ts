import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogBodyComponent } from './mat-dialog-body.component';

describe('MatDialogBodyComponent', () => {
  let component: MatDialogBodyComponent;
  let fixture: ComponentFixture<MatDialogBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
