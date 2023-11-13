import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // import HttpClientModule
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { DailyWeatherComponent } from './daily-weather.component';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('DailyWeatherComponent', () => {
  let component: DailyWeatherComponent;
  let fixture: ComponentFixture<DailyWeatherComponent>;
  let weatherService: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DailyWeatherComponent],
      providers: [WeatherService, DatePipe],
    });
    weatherService = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process daily forecast', () => {
    const bulkWeatherData = {
      list: [
        {
          dt: 1628772000,
          main: {
            temp: 25,
            feels_like: 27,
            temp_min: 25,
            temp_max: 25,
            pressure: 1013,
            humidity: 70,
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
              icon: '01d',
            },
          ],
          clouds: {
            all: 0,
          },
          wind: {
            speed: 2.57,
            deg: 0,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: 'd',
          },
          dt_txt: '2021-08-12 12:00:00',
        },
      ],
    };

    spyOn(weatherService, 'getFiveDayWeather').and.returnValue(
      of(bulkWeatherData)
    );

    component.ngOnInit();

    // expect(component.dailyWeatherData).toEqual({
    //   '0': {
    //     dailyWeatherIcon: 'https://openweathermap.org/img/wn/01n@2x.png',
    //     date: '2023-11-13',
    //     maxTemperature: '9.18',
    //     minTemperature: '5.61',
    //     weatherDescription: 'clear sky, scattered clouds, broken clouds',
    //   },
    // });
  });
});
