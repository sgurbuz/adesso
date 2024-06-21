import { createAction, props } from '@ngrx/store';

import { UnitItem } from '../interfaces/unit-item';

export const loadUnits = createAction('[Units] Load Units');

export const loadUnitsSuccess = createAction(
  '[Units] Load Units Success',
  props<{ data: UnitItem[] }>()
);

export const setFilter = createAction(
  '[Units] Set Filter',
  props<{ filter: {
    age?: string | null | undefined;
    wood?: number[] | null;
    food?: number[] | null;
    gold?: number[] | null;
  } }>()
);

export const loadDataFailure = createAction(
  '[Units] Load Units Failure',
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  props<{ error: any }>()
);

export const loadUnit = createAction(
  '[Units] Load Unit',
  props<{ id: number }>()
);

export const loadUnitSuccess = createAction(
  '[Units] Load Unit Success',
  props<{ unit: UnitItem | undefined }>()
);
