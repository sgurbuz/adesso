import { Routes } from '@angular/router';

import { UnitsComponent } from './pages/units/units.component';
import { UnitDetailComponent } from './pages/unit-detail/unit-detail.component';

export const routes: Routes = [
    {
        path: 'units',
        component: UnitsComponent,
        title: 'Age of Empires Units',
    },
    {
        path: 'units/:id',
        component: UnitDetailComponent,
        title: 'Age of Empires Unit Info',
    },
];
