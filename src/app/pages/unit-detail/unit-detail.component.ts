import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { UnitItem } from '../../interfaces/unit-item';
import { UnitState } from '../../store/unit.reducer';
import * as UnitActions from '../../store/unit.actions'

@Component({
  selector: 'app-unit-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './unit-detail.component.html',
  styleUrl: './unit-detail.component.scss'
})
export class UnitDetailComponent {
  routeParam: ActivatedRoute = inject(ActivatedRoute);
  private unitId = -1;
  public unitDetail: UnitItem | undefined;
  public isLoading: boolean = true;
  public featureKeys = [
    {
      key: 'age',
      title: 'Min. Required Age'
    },
    {
      key: 'cost',
      title: 'Costs'
    },
    {
      key: 'build_time',
      title: 'Build Time'
    },
    {
      key: 'reload_time',
      title: 'Reload Time'
    },
    {
      key: 'hit_points',
      title: 'Hit Points'
    },
    {
      key: 'attack',
      title: 'Attack'
    },
    {
      key: 'accuracy',
      title: 'Accuracy'
    }
  ];

  constructor(private store: Store<UnitState>) {
    this.unitId = Number(this.routeParam.snapshot.params['id']);

    this.store.dispatch(UnitActions.loadUnit({id: this.unitId}));

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    this.store.select((state: UnitState) => state.data).subscribe((dataState: any) => {
      this.unitDetail = dataState.selectedUnit;
      this.isLoading = false;
    });
  }

  public getCosts() {
    if(this.unitDetail?.cost) {
      const costFlags = Object.keys(this.unitDetail.cost);
      const costData: any = this.unitDetail.cost;
      let costHtml: string = '';
      costFlags.forEach((item) => {
        costHtml +=`${item}: ${costData[item]} `;
      });
      return costHtml;
    } else {
      return '-'
    }
  }

  public  getDetailValueFor(flag: string) {
    const detailData: any = this.unitDetail;
    return detailData[flag] ? detailData[flag]: '-';
  }
}
