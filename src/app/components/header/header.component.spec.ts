import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { AppService } from '../../services/app.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let appService: AppService;

  beforeEach(async () => {
    const appServiceMock = {
      isAtHome: false
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: AppService, useValue: appServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct logo when isAtHome is true', () => {
    appService.isAtHome = true;
    const logo = component.getLogo();
    expect(logo).toBe('/assets/images/logo.png');
  });

  it('should return correct logo when isAtHome is false', () => {
    appService.isAtHome = false;
    const logo = component.getLogo();
    expect(logo).toBe('/assets/images/logo-line.png');
  });
});