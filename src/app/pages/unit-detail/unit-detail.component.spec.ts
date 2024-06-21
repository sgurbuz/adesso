import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing'; 

import { UnitDetailComponent } from './unit-detail.component';
import { UnitItem } from '../../interfaces/unit-item';
import { UnitState } from '../../store/unit.reducer';
import * as UnitActions from '../../store/unit.actions';

describe('UnitDetailComponent', () => {
  let component: UnitDetailComponent;
  let fixture: ComponentFixture<UnitDetailComponent>;
  let store: MockStore<UnitState>; // Mock NgRx store

  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: { params: { id: '123' } } 
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule],
      declarations: [UnitDetailComponent],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Mock route params
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'select').and.returnValue(of({ 
      selectedUnit: { 
        id: 123,
        name: 'Test Unit',
        age: 'Castle',
        cost: { wood: 100, food: 50 },
        build_time: 20,
      }
    })); 

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load unit details on initialization', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const expectedAction = UnitActions.loadUnit({ id: 123 });

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should display unit details correctly', () => {
    expect(component.unitDetail).toBeDefined();
    expect(component.unitDetail?.name).toEqual('Test Unit');
    expect(component.isLoading).toBeFalse();

    const nameElement = fixture.nativeElement.querySelector('h2');
    expect(nameElement?.textContent).toContain('Test Unit');

    const costElement = fixture.nativeElement.querySelector('.cost'); 
    expect(costElement?.textContent).toContain('wood: 100');
    expect(costElement?.textContent).toContain('food: 50');
  });
});
