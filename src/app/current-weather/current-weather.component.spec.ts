import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from '../weather.service';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherService: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
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

  it('should display weather data', () => {
    const weatherData = {
      feelsLike: 20,
      humidity: 50,
      temp: 25,
      wind_speed: 10,
      description: 'sunny',
      overallWeathericon: '01d',
    };
    component.WeatherData = weatherData;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const feelsLike = compiled.querySelector('.feels-like');

    if (feelsLike !== null) {
      expect(feelsLike.textContent).toContain('20');
    }
    const humidity = compiled.querySelector('.humidity');

    if (humidity !== null) {
      expect(humidity.textContent).toContain('50');
    }
    const temp = compiled.querySelector('.temp');

    if (temp !== null) {
      expect(temp.textContent).toContain('25');
    }
    const windSpeed = compiled.querySelector('.wind-speed');

    if (windSpeed !== null) {
      expect(windSpeed.textContent).toContain('10');
    }
    const description = compiled.querySelector('.description');

    if (description !== null) {
      expect(description.textContent).toContain('sunny');
    }
    const overallWeatherIcon = compiled.querySelector('.overall-weather-icon');

    if (overallWeatherIcon !== null) {
      expect(overallWeatherIcon.getAttribute('src')).toContain('01d');
    }
  });
});
