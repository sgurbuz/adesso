import { createReducer, on } from '@ngrx/store';

import * as UnitActions from './unit.actions';
import { UnitItem } from '../interfaces/unit-item';

export interface UnitState {
  data: UnitItem[];
  filteredData: UnitItem[];
  filter: {
    age?: string | null;
    wood?: number[] | null;
    food?: number[] | null;
    gold?: number[] | null;
  };
  error?: string;
  selectedUnit: UnitItem | null | undefined;
}

export const initialState: UnitState = {
  data: [],
  filteredData: [],
  filter: {
    age: '',
    wood: null,
    food: null,
    gold: null
  },
  selectedUnit: null
};

export const unitReducer = createReducer(
  initialState,
  on(UnitActions.loadUnitsSuccess, (state, { data }) => ({
    ...state,
    data,
    filteredData: data
  })),
  on(UnitActions.loadUnitSuccess, (state, { unit }) => ({
    ...state,
    selectedUnit: unit
  })),
  on(UnitActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
    filteredData: state.data.filter(item => {
      const ageMatch = !filter.age || filter.age === 'all' || item.age === filter.age;
      const woodMatch = 
        (!filter.wood || (!!item.cost && !!item.cost.Wood && item.cost.Wood >= filter.wood[0])) &&
        (!filter.wood || (!!item.cost && !!item.cost.Wood && item.cost.Wood <= filter.wood[1]));
      const foodMatch = 
        (!filter.food || (!!item.cost && !!item.cost.Food && item.cost.Food >= filter.food[0])) &&
        (!filter.food || (!!item.cost && !!item.cost.Food && item.cost.Food <= filter.food[1]));
      const goldMatch = 
        (!filter.gold || (!!item.cost && !!item.cost.Gold && item.cost.Gold >= filter.gold[0])) &&
        (!filter.gold || (!!item.cost && !!item.cost.Gold && item.cost.Gold <= filter.gold[1]));
      return ageMatch && woodMatch && foodMatch && goldMatch;
    })
  })),
  on(UnitActions.loadDataFailure, (state, { error }) => ({
    ...state,
    error
  })),
);
