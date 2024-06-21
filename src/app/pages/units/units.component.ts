import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppService } from '../../services/app.service';
import { UnitItem } from '../../interfaces/unit-item';
import { FiltersComponent } from '../../components/filters/filters.component';
import { ListComponent } from '../../components/list/list.component';
import { UnitState } from '../../store/unit.reducer';
import * as UnitActions from '../../store/unit.actions'

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [FiltersComponent, ListComponent],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent {
  public units: UnitItem [] = [];

  private units$: Observable<UnitItem[]> = this.store.select(
    (state: UnitState) => state.filteredData
  );

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public error$: Observable<any> = this.store.select(state => state.error);

  constructor(private appService: AppService, private store: Store<UnitState>) {
    this.store.dispatch(UnitActions.loadUnits());

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    this.store.select((state: UnitState) => state.data).subscribe((dataState: any) => {
      this.units = dataState.filteredData;
    });
  }
}
