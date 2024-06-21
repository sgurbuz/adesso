import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, from } from 'rxjs';

import * as UnitActions from './unit.actions';
import { AppService } from '../services/app.service';

@Injectable()
export class UnitEffects {
    loadData$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UnitActions.loadUnits),
          switchMap(() => {
            return from(this.appService.getAllUnits()).pipe( 
              map(data => UnitActions.loadUnitsSuccess({ data })),
              catchError(error => of(UnitActions.loadDataFailure({ error })))
            );
          })
        )
    );

    loadUnit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UnitActions.loadUnit),
        switchMap(({ id }) =>  {
          return from(this.appService.getUnitById(id)).pipe( 
            map(unit => UnitActions.loadUnitSuccess({ unit })),
            catchError(error => of(UnitActions.loadDataFailure({ error })))
          );
        })
      )
    );
      
      constructor(private actions$: Actions, private appService: AppService) {}
}
