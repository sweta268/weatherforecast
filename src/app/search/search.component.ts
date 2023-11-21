import { Component, OnDestroy, OnInit } from '@angular/core';

import { WeatherService } from '../weather.service';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  cityName = ''; //   To hold city name from FE
  latitude: any = ''; //   To hold latitude and longitude from FE
  longitude: any = ''; // To hold latitude and longitude from FE
  temperatureUnit = ''; //  To hold temperature unit from FE
  pattern = '^[a-zA-Z ]*$'; //for city name
  minlength = '3'; //for city name
  maxlength = '100'; //for city name
  latlongmaxlength = '10'; //for latitude longitude
  latlongpattern = '^[0-9.-]*$'; //for latitude longitude
  submitclicked = false; //To handle validation error on form
  private subscription!: Subscription; //handle subscription from weather service
  displaytemperatureUnit: string = 'Imperial'; //To display temperature unit since imperial refers to farenheit and metric refers to celsius
  errorMessage: any; // To display error message
  dailyForecast: any; //  To hold daily forecast data
  currentForecast: any; // To hold current forecast data

  constructor(private weatherService: WeatherService) {
    this.subscription = new Subscription();
  }
  ngOnInit(): void {
    //this.searchWeather('imperial'); //To get current weather and 5 day weather on page load
  }
  clearInput(input: string): void {
    if (input == 'latitude' || input == 'longitude') {
      this.cityName = '';
    } else {
      this.latitude = '';
      this.longitude = '';
    }
  }
  onSubmit(form: NgForm) {
    this.errorMessage = '';
    this.submitclicked = true; //To handle validation error on city form
    if ((this.latitude == '' || this.longitude == '') && this.cityName == '') {
      this.errorMessage = 'Please enter city name or latitude and longitude';
    } else if (form.valid) {
      // this.submitclicked = false;
      this.searchWeather(this.temperatureUnit);
    }
  }

  searchWeather(selectedUnit: string) {
    this.displaytemperatureUnit =
      selectedUnit === 'imperial' ? 'Fahrenheit' : 'Celsius';

    if (this.cityName || (this.latitude && this.longitude)) {
      this.subscription = this.weatherService
        .getWeather(this.cityName, selectedUnit, this.latitude, this.longitude) //To get current weather from service
        .subscribe({
          next: (data: any) => {
            this.currentForecast = data; //To display current weather
            this.currentForecast.temperatureUnit = this.displaytemperatureUnit; //To display temperature unit
            this.weatherService.updateCurrentWeatherData(this.currentForecast); //To update current weather data
          },
          error: (err: any) => {
            this.errorMessage = err.error.message; // To display error message
          },
        });

      this.subscription = this.weatherService
        .getDailyWeather(
          this.cityName,
          selectedUnit,
          this.latitude,
          this.longitude,
          '40'
        ) //To get 5 day weather from service
        .subscribe({
          next: (data: any) => {
            this.dailyForecast = data;
            this.weatherService.updateDailyWeatherData(this.dailyForecast); //To update daily weather data
          },
          error: (err: any) => {
            this.errorMessage = err.error.message; // To display error message
          },
        });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); //Destroy subscription
  }
}
