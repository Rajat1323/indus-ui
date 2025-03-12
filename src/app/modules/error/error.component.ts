import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from 'src/app/shared/models/shared.module';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './error.component.html',
})
export class ErrorComponent { }
