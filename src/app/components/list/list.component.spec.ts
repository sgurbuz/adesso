import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule],
      declarations: [ListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    // Set input data for the component
    component.list = [
      { 
        id: 1, 
        name: 'Test Unit', 
        age: 'Castle', 
        cost: { wood: 100, food: 50 } 
      },
      // Add more UnitItem objects as needed
    ];
    
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display costs correctly', () => {
    const costElement = fixture.nativeElement.querySelector('.cost'); // Adjust selector as needed
    expect(costElement.textContent).toContain('wood: 100');
    expect(costElement.textContent).toContain('food: 50');
  });
  
  // Additional Test Scenarios (Optional)

  it('should display correct number of list items', () => {
    const listItems = fixture.nativeElement.querySelectorAll('li'); // Adjust selector as needed
    expect(listItems.length).toBe(component.list.length);
  });

  it('should handle empty list', () => {
    component.list = [];
    fixture.detectChanges();
    const listContainer = fixture.nativeElement.querySelector('ul'); // Adjust selector as needed
    expect(listContainer.textContent).toContain('No units found'); // Or whatever your empty message is
  });
});
