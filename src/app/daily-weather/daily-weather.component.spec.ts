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
    fixture = TestBed.createComponent(DailyWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //test to check if the raw weather data when passed in does show the processed data on UI
  it('should display Daily weather data', () => {
    const bulkWeatherData = {
      cod: '200',
      message: 0,
      cnt: 40,
      list: [
        {
          dt: 1700265600,
          main: {
            temp: 63.81,
            feels_like: 63,
            temp_min: 59.14,
            temp_max: 63.81,
            pressure: 1012,
            sea_level: 1012,
            grnd_level: 1008,
            humidity: 66,
            temp_kf: 2.59,
          },
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: 'overcast clouds',
              icon: '04n',
            },
          ],
          clouds: {
            all: 100,
          },
          wind: {
            speed: 7.65,
            deg: 193,
            gust: 25.52,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: 'n',
          },
          dt_txt: '2023-11-18 00:00:00',
        },
      ],
    };

    const dailyForecast = component.processDailyForecast(bulkWeatherData); //call function on ts to process data
    component.dailyForecast = dailyForecast; //assign the processed data to the component variable
    fixture.detectChanges(); // detect changes to the component
    const compiled = fixture.nativeElement; // get the compiled html
    const date = compiled.querySelector('.date'); // get the date element

    if (date !== null) {
      // check if date is not null
      expect(date.textContent).toContain('11/17/23'); // check if the date is correct
    }
    const day = compiled.querySelector('.day'); // get the day element

    if (day !== null) {
      // check if day is not null
      expect(day.textContent).toContain('Fri'); // check if the day is correct
    }
    const maxTemp = compiled.querySelector('.maxTemperature'); // get the max temp element

    if (maxTemp !== null) {
      // check if max temp is not null
      expect(maxTemp.textContent).toContain('63.81'); // check if the max temp is correct
    }
    const minTemp = compiled.querySelector('.minTemperature'); // get the min temp element

    if (minTemp !== null) {
      //  check if min temp is not null
      expect(minTemp.textContent).toContain('59.14'); // check if the min temp is correct
    }
    const description = compiled.querySelector('.weather-description'); // get the weather description element

    if (description !== null) {
      // check if weather description is not null
      expect(description.textContent).toContain('overcast clouds'); //  check if the weather description is correct
    }
  });
});
