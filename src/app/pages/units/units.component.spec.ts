import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { UnitsComponent } from './units.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { ListComponent } from '../../components/list/list.component';
import { AppService } from '../../services/app.service';
import { UnitState } from '../../store/unit.reducer';
import * as UnitActions from '../../store/unit.actions';
import { UnitItem } from '../../interfaces/unit-item';

describe('UnitsComponent', () => {
  let component: UnitsComponent;
  let fixture: ComponentFixture<UnitsComponent>;
  let store: MockStore<UnitState>;
  let appServiceMock: jasmine.SpyObj<AppService>;

  beforeEach(async () => {
    appServiceMock = jasmine.createSpyObj('AppService', ['someMethod']);

    await TestBed.configureTestingModule({
      declarations: [UnitsComponent, FiltersComponent, ListComponent],
      providers: [
        provideMockStore(),
        { provide: AppService, useValue: appServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUnits action on initialization', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges(); // Trigger ngOnInit
    expect(dispatchSpy).toHaveBeenCalledWith(UnitActions.loadUnits());
  });

  it('should update units based on store data', () => {
    const mockUnits: UnitItem[] = [{
      id: 1, name: 'Archer',
      description: '',
      age: '',
      cost: null,
      reload_time: 0,
      movement_rate: 0,
      line_of_sight: 0,
      hit_points: 0,
      range: '',
      attack: 0,
      armor: ''
    }];
    store.setState({ data: { filteredData: mockUnits } } as unknown as UnitState);

    fixture.detectChanges();

    expect(component.units).toEqual(mockUnits);
  });

  it('should handle error from store', () => {
    const mockError = { message: 'Error loading units' };
    store.setState({ error: mockError } as unknown as UnitState);

    fixture.detectChanges();

    expect(component.error$).toBeObservable(of(mockError));
  });
});

