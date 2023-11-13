import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [DatePipe],
})
export class SearchComponent implements OnDestroy {
  cityName = '';
  weatherData: any;
  fiveDayWeather: any;
  dailyWeatherData: { [key: string]: any[] } = {};
  latitude: any = '';
  longitude: any = '';
  temperatureUnit = '';
  pattern = '^[a-zA-Z ]*$';
  minlength = '3';
  maxlength = '100';
  latlongmaxlength = '10';
  latlongpattern = '^[0-9.]*$';
  submitclicked = false;
  latlongsubmitclicked = false;
  private subscription!: Subscription;

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {
    this.subscription = new Subscription();
  }

  onSubmit(form: NgForm) {
    this.submitclicked = true; //To handle validation error on city form

    if (form.valid) {
      this.submitclicked = false;
      // this.searchWeather('metric');
    }
  }
  onSubmitLatLong(latlongForm: NgForm) {
    this.latlongsubmitclicked = true; //To handle validation error on Latitude and longitude form
    if (latlongForm.valid) {
      this.latlongsubmitclicked = false;
      // this.searchWeather('metric');
    }
  }
  searchWeather(selectedUnit: string) {
    this.temperatureUnit =
      selectedUnit === 'imperial' ? 'Farenheit' : 'Celsius';

    if (this.cityName || (this.latitude && this.longitude)) {
      this.subscription = this.weatherService
        .getWeather(this.cityName, selectedUnit, this.latitude, this.longitude) //To get current weather from service
        .subscribe((data) => {
          this.weatherData = data; //To display current weather
          this.weatherData.temperatureUnit = this.temperatureUnit; //To display temperature unit
          this.weatherService.updateCurrentWeatherData(this.weatherData); //To update current weather data
        });

      this.subscription = this.weatherService
        .getFiveDayWeather(
          this.cityName,
          selectedUnit,
          this.latitude,
          this.longitude,
          '40'
        ) //To get 5 day weather from service
        .subscribe((data) => {
          this.fiveDayWeather = data;
          this.weatherService.updateFiveDayWeatherData(this.fiveDayWeather); //To update 5 day weather data
        });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
