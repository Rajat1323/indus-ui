import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { SharedModule } from 'src/app/shared/models/shared.module';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SharedModule],
})
export class LayoutComponent implements OnInit {
  private mainContent: HTMLElement | null = null;
  message: string = '';

  constructor(private router: Router, private test: TestService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
    this.test.getWelcomeMessage().subscribe(data => {
      this.message = data;
    });
  }
}
