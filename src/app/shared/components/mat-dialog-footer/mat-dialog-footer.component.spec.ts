import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogFooterComponent } from './mat-dialog-footer.component';

describe('MatDialogFooterComponent', () => {
  let component: MatDialogFooterComponent;
  let fixture: ComponentFixture<MatDialogFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
