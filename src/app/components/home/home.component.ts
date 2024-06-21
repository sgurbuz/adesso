import { Component } from '@angular/core';

import { CtaComponent } from '../cta/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
