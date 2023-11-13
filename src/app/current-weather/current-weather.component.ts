import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
  @Input() WeatherData: any;
  feelsLike: any;
  humidity: any;
  temp: any;
  wind_speed: any;
  description: any;
  overallWeathericon: any;
  constructor(private weatherService: WeatherService) {}
  ngOnInit() {
    this.weatherService.currentWeatherData.subscribe((data) => {
      if (data) {
        this.processCurrentWeather(data);
      }
    });
  }

  processCurrentWeather(WeatherData: any) {
    console.log(WeatherData);
    //Put all the current data in a variable so there is no business logic on html
    if (WeatherData && WeatherData.main && WeatherData.main.feels_like) {
      this.feelsLike = WeatherData.main.feels_like; //feels like weather
    }
    if (WeatherData && WeatherData.main && WeatherData.main.humidity) {
      this.humidity = WeatherData.main.humidity; //humidity
    }
    if (WeatherData && WeatherData.main && WeatherData.main.temp) {
      this.temp = WeatherData.main.temp; //current temperature
    }
    if (WeatherData && WeatherData.main && WeatherData.wind.speed) {
      this.wind_speed = WeatherData.wind.speed; //Wind speed
    }
    if (WeatherData && WeatherData.main && WeatherData.weather) {
      this.description = WeatherData.weather[0].description; //Weather Description
    }
    if (WeatherData && WeatherData.main && WeatherData.weather) {
      this.overallWeathericon = WeatherData.weather[0].icon; //Weather Icon
      this.overallWeathericon = `https://openweathermap.org/img/wn/${this.overallWeathericon}@2x.png`;
    }
  }
}
