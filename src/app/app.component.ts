import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppService } from './services/app.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Adesso Code Challenge - Serhan Gürbüz';

  constructor(private router: Router, public appService: AppService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if(event.url.includes('units')) {
          this.appService.isAtHome = false
        } else {
          this.appService.isAtHome = true
        }
      }
    });
  }

  public getBgCreative() {
    const luckyNumber = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    return `background-image: url(/assets/images/wall-${luckyNumber}.jpg)`;
  }
}
