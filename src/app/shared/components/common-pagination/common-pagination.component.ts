import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPagination } from 'src/app/core/utils/helper';

@Component({
  selector: 'app-common-pagination',
  standalone: true,
  imports: [],
  templateUrl: './common-pagination.component.html',
  styleUrl: './common-pagination.component.scss'
})
export class CommonPaginationComponent {

  constructor() { }

  @Input('pagination') pagination!: IPagination;
  @Output() pageChange = new EventEmitter<IPagination>();

  nextPage() {
    this.pagination.page += 1;
    this.pageChange.emit(this.pagination)
  }

  previousPage() {
    this.pagination.page -= 1;
    this.pageChange.emit(this.pagination)
  }


}
