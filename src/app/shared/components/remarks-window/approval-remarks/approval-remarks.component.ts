import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/models/shared.module';

@Component({
  selector: 'app-approval-remarks',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './approval-remarks.component.html',
  styleUrl: './approval-remarks.component.scss'
})
export class ApprovalRemarksComponent {
  constructor(
    private _dialogRef: MatDialogRef<ApprovalRemarksComponent>,
  ) { }

  dialogRef!: MatDialogRef<any>;
  remarksControl: FormControl = new FormControl('', [Validators.required]);

  closeDialog() {
    this._dialogRef.close();
  }

  handleClickSubmit() {
    this._dialogRef.close(this.remarksControl.value)
  }
}
