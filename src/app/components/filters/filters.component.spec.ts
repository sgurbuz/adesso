import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';

import { FiltersComponent } from './filters.component';
import { UnitState } from '../../store/unit.reducer';
import * as UnitActions from '../../store/unit.actions';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let store: MockStore<UnitState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SelectButtonModule,
        FormsModule,
        CheckboxModule,
        SliderModule,
        ReactiveFormsModule
      ],
      declarations: [FiltersComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setFilter action on form value change', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.filterForm.get('age')?.setValue('Dark');
    component.filterForm.get('woodEnabled')?.setValue(true);
    component.filterForm.get('wood')?.setValue(50);
    component.filterForm.get('foodEnabled')?.setValue(true);
    component.filterForm.get('food')?.setValue(100);
    component.filterForm.get('goldEnabled')?.setValue(true);
    component.filterForm.get('gold')?.setValue(150);

    const expectedAction = UnitActions.setFilter({
      filter: { age: 'Dark', wood: [15, 50], food: [37, 100], gold: [14,150] }
    });

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});