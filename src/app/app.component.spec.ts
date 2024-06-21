import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppService } from './services/app.service';
import { UnitsComponent } from './pages/units/units.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  let appService: AppService;

  beforeEach(async () => {
    const appServiceMock = {
      isAtHome: true // Initial value
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([ // Set up routes for testing
          { path: '', component: HomeComponent },
          { path: 'units', component: UnitsComponent } // Placeholder for UnitsComponent
        ]),
        CommonModule 
      ],
      declarations: [AppComponent, HeaderComponent, HomeComponent], // Include child components
      providers: [
        { provide: AppService, useValue: appServiceMock }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    appService = TestBed.inject(AppService);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update appService.isAtHome on NavigationStart', fakeAsync(() => { 
    router.navigate(['/units']); 
    tick(); 

    expect(appService.isAtHome).toBeFalse();

    router.navigate(['/']); // Go back to home
    tick();

    expect(appService.isAtHome).toBeTrue();
  }));

  it('should return random background image style', () => {
    const bgStyle = component.getBgCreative();
    expect(bgStyle).toMatch(/background-image: url\(\/assets\/images\/wall-[1-5].jpg\)/);
  });
});
