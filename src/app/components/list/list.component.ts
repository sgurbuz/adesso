import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UnitItem } from '../../interfaces/unit-item';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  public list = input<UnitItem[]>();

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public getCostsFor(costObj: any) {
    const costFlags = Object.keys(costObj);
    let costHtml: string = '';
    costFlags.forEach((item) => {
      costHtml +=`${item}: ${costObj[item]} `;
    });
    return costHtml;
  }

}
