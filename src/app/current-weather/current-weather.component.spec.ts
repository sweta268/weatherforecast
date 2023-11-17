import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from '../weather.service';
import { BehaviorSubject, of } from 'rxjs';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherService: WeatherService;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    const weatherServiceSpyObj = jasmine.createSpyObj('WeatherService', [
      'currentWeatherData',
    ]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CurrentWeatherComponent],
      providers: [WeatherService],
    });
    weatherService = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  ////test to check if the raw weather data when passed in does show the processed data on UI
  it('should display weather data', () => {
    const weatherData = {
      main: {
        feels_like: 20,
        humidity: 50,
        temp: 25,
      },
      wind: { speed: 10 },
      weather: [{ description: 'sunny', icon: '01d' }],
    };

    component.WeatherData = weatherData; // Pass the raw weather data to the component
    component.processCurrentWeather(weatherData); //  Call the function to process the data
    fixture.detectChanges(); // Trigger change detection
    const compiled = fixture.nativeElement; // Get the compiled HTML
    const feelsLike = compiled.querySelector('.feelsLike'); // Get the element with class feelsLike

    if (feelsLike !== null) {
      //  Check if the element exists
      expect(feelsLike.textContent).toContain('20'); // Check if the element contains the expected value
    }

    const humidity = compiled.querySelector('.humidity'); // Get the element with class humidity

    if (humidity !== null) {
      // Check if the element exists
      expect(humidity.textContent).toContain('50'); // Check if the element contains the expected value
    }
    const temp = compiled.querySelector('.temp'); // Get the element with class temp

    if (temp !== null) {
      expect(temp.textContent).toContain('25'); // Check if the element contains the expected value
    }
    const windSpeed = compiled.querySelector('.windSpeed'); // Get the element with class windSpeed

    if (windSpeed !== null) {
      // Check if the element exists
      expect(windSpeed.textContent).toContain('10'); // Check if the element contains the expected value
    }
    const description = compiled.querySelector('.description'); // Get the element with class description

    if (description !== null) {
      // Check if the element exists
      expect(description.textContent).toContain('sunny'); // Check if the element contains the expected value
    }
    const overallWeatherIcon = compiled.querySelector('.img-fluid'); // Get the element with class img-fluid

    if (overallWeatherIcon !== null) {
      // Check if the element exists
      expect(overallWeatherIcon.getAttribute('src')).toContain('01d'); // Check if the element contains the expected value
    }
  });
});
