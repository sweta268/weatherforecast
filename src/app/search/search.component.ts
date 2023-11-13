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
export class SearchComponent implements OnInit, OnDestroy {
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
  latlongpattern = '^[0-9.-]*$';
  submitclicked = false;
  private subscription!: Subscription;
  displaytemperatureUnit: string = 'Imperial';
  errorMessage: any;

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {
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
      console.log(this.latitude, this.longitude);

      this.submitclicked = false;
      this.searchWeather(this.temperatureUnit);
      // this.latitude = ''; //To clear latitude so users dont get confused between city and latitude
      // this.longitude = ''; //To clear longitude so users dont get confused between city and longitude
      // this.cityName = ''; //To clear latitude so users dont get confused between city and latitude
    }
  }

  searchWeather(selectedUnit: string) {
    this.displaytemperatureUnit =
      selectedUnit === 'imperial' ? 'Fahrenheit' : 'Celsius';

    if (this.cityName || (this.latitude && this.longitude)) {
      this.subscription = this.weatherService
        .getWeather(this.cityName, selectedUnit, this.latitude, this.longitude) //To get current weather from service
        .subscribe(
          (data) => {
            console.log(data);
            this.weatherData = data; //To display current weather
            this.weatherData.temperatureUnit = this.displaytemperatureUnit; //To display temperature unit
            this.weatherService.updateCurrentWeatherData(this.weatherData); //To update current weather data
          },
          (error) => {
            console.log(error);
            this.errorMessage = error.error.message; // To display error message
          }
        );

      this.subscription = this.weatherService
        .getFiveDayWeather(
          this.cityName,
          selectedUnit,
          this.latitude,
          this.longitude,
          '40'
        ) //To get 5 day weather from service
        .subscribe(
          (data) => {
            console.log(data);
            this.fiveDayWeather = data;
            this.weatherService.updateFiveDayWeatherData(this.fiveDayWeather); //To update 5 day weather data
          },
          (error) => {
            console.log(error);
            this.errorMessage = error.error.message; // To display error message
          }
        );
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); //Destroy subscription
  }
}
