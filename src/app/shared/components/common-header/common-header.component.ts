import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../models/shared.module';

@Component({
  standalone: true,
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent {

  @Input() title: string = '';
  @Output() onClose: EventEmitter<boolean>;

  constructor() {
    this.onClose = new EventEmitter(false);
  }

  ngOnInit(): void { }

  closeDialog() {
    this.onClose.emit(true);
  }
}
