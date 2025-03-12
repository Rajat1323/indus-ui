import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  public constructor(
    private _dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: { message: string }
  ) { }

  dialogData: { message: string } = this._dialogData || {message: 'Are you sure want to delete this row ?'};

  handleBtnClick(status: boolean) {
    this._dialogRef.close(status);
  }

}
