import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [SearchComponent],
      providers: [WeatherService, DatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  interface WeatherData {
    // define the WeatherData interface
  }

  type TemperatureUnit = 'metric' | 'imperial';

  @Injectable({
    providedIn: 'root',
  })
  class WeatherServiceMock {
    getWeatherDataByCityName(
      cityName: string,
      temperatureUnit: TemperatureUnit
    ): Observable<WeatherData> {
      return {} as Observable<WeatherData>;
    }

    getWeatherDataByLatLong(
      latitude: string,
      longitude: string,
      temperatureUnit: TemperatureUnit
    ): Observable<WeatherData> {
      return {} as Observable<WeatherData>;
    }
  }

  // describe('onSubmit', () => {
  //   let spy: jasmine.Spy;
  //   let weatherService: weatherService; // add type annotation

  //   beforeEach(() => {
  //     weatherService = TestBed.inject(WeatherServiceMock); // update to use correct service
  //     spy = spyOn(weatherService, 'getWeatherDataByCityName').and.callThrough();
  //   });

  //   it('should call weatherService.getWeatherDataByCityName', () => {
  //     const mockForm = {
  //       valid: true,
  //     } as NgForm;
  //     component.onSubmit(mockForm);
  //     expect(spy).toHaveBeenCalled();
  //   });
  // });
});
