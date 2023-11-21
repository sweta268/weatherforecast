import { Component, Input } from '@angular/core';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
  feelsLike: any;
  humidity: any;
  temp: any;
  windSpeed: any;
  description: any;
  overallWeathericon: any;
  WeatherData: any;
  constructor(private weatherService: WeatherService) {}
  ngOnInit() {
    this.weatherService.currentWeatherData.subscribe((data) => {
      if (data) {
        this.WeatherData = data;
        this.processCurrentWeather(data);
      }
    });
  }

  processCurrentWeather(WeatherData: any) {
    //Put all the current data in a variable so there is no business logic on html
    if (WeatherData && WeatherData?.main?.feels_like) {
      this.feelsLike = WeatherData.main.feels_like; //feels like weather
    }
    if (WeatherData && WeatherData?.main.humidity) {
      this.humidity = WeatherData.main.humidity; //humidity
    }
    if (WeatherData && WeatherData?.main?.temp) {
      this.temp = WeatherData.main.temp; //current temperature
    }
    if (WeatherData && WeatherData?.wind?.speed) {
      this.windSpeed = WeatherData.wind.speed; //Wind speed
    }
    if (WeatherData && WeatherData?.weather) {
      this.description = WeatherData.weather[0].description; //Weather Description
    }
    if (WeatherData && WeatherData?.weather) {
      this.overallWeathericon = WeatherData.weather[0].icon; //Weather Icon
      this.overallWeathericon = `https://openweathermap.org/img/wn/${this.overallWeathericon}@2x.png`;
    }
  }
}
