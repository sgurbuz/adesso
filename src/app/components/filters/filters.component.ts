import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { Store } from '@ngrx/store';

import { UnitState } from '../../store/unit.reducer';
import * as UnitActions from '../../store/unit.actions';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [SelectButtonModule, FormsModule, CheckboxModule, SliderModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    public ageOptions: any[] = [{ label: 'All', value: 'all' },{ label: 'Dark', value: 'Dark'} ,{ label: 'Feudal', value: 'Feudal' },{ label: 'Castle', value: 'Castle' },{ label: 'Imperial', value: 'Imperial' }];
    public initialRange: number[] = [0, 200]

    public filterForm = new FormGroup({
      age: new FormControl('All'),
      woodEnabled: new FormControl(false),
      wood: new FormControl(),
      foodEnabled: new FormControl(false),
      food: new FormControl(),
      goldEnabled: new FormControl(false),
      gold: new FormControl(),
    });

    constructor(private store: Store<UnitState>) {
      this.filterForm.valueChanges.subscribe(filter => {
        const updatedFilter = {
          age: filter.age === 'All' ? '' : filter.age,
          wood: filter.woodEnabled ? filter.wood : null,
          food: filter.foodEnabled ? filter.food : null,
          gold: filter.goldEnabled ? filter.gold : null
        };
        this.store.dispatch(UnitActions.setFilter({ filter: updatedFilter }));
      });
    }
}
