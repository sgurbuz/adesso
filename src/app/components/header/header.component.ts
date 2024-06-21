import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public appService: AppService) {}

  public getLogo() {
    if(this.appService.isAtHome) {
      return '/assets/images/logo.png';
    } else {
      return '/assets/images/logo-line.png';
    }
  }

}
