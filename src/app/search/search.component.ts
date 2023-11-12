import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [DatePipe],
})
export class SearchComponent {
  cityName: string = '';
  weatherData: any;
  feelsLike: any;
  pressure: any;
  temp: any;
  temp_max: any;
  temp_min: any;
  fiveDayWeather: any;
  fiveDayForecast: any;
  dailyWeatherData: { [key: string]: any[] } = {};
  humidity: any;
  wind_speed: any;
  description: any;

  minTemp: any;
  maxTemp: any;
  averageWeather: any;
  averageWeatherDescription: any = '';
  previousDate: any = '';
  latitude: any;
  longitude: any;
  temperatureUnit: string = '';
  overallWeathericon: string = '';
  dailyWeatherIcon: string = '';

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {}

  searchWeather(selectedUnit: string) {
    if (selectedUnit === 'imperial') {
      this.temperatureUnit = 'Farenheit'; // To show the selected unit on FE
    }
    if (selectedUnit === 'metric') {
      this.temperatureUnit = 'Celsius'; // To show the selected unit on FE
    }
    if (this.cityName) {
      this.weatherService
        .getWeather(this.cityName, selectedUnit)
        .subscribe((data) => {
          this.weatherData = data;
          this.weatherData.temperatureUnit = this.temperatureUnit;

          this.weatherService.updateCurrentWeatherData(this.weatherData); // Update BehaviorSubject
        });
      this.weatherService
        .getFiveDayWeather(this.cityName, selectedUnit, '40')
        .subscribe((data) => {
          this.fiveDayWeather = data; //Five Day Weather Data by city
          this.weatherService.updateFiveDayWeatherData(this.fiveDayWeather); // Update BehaviorSubject
        });
    }
    if (this.latitude && this.longitude) {
      this.weatherService
        .getWeatherBylatLong(this.latitude, this.longitude, selectedUnit)
        .subscribe((data) => {
          this.weatherData = data;
          this.weatherService.updateCurrentWeatherData(this.weatherData); // Update BehaviorSubject
        });
      this.weatherService
        .getFiveDayWeatherBylatLong(this.latitude, this.longitude, selectedUnit)
        .subscribe((data) => {
          this.fiveDayWeather = data; //Five Day Weather Data by latitude and longitude
          this.weatherService.updateFiveDayWeatherData(this.fiveDayWeather); // Update BehaviorSubject
        });
    }
  }
}
