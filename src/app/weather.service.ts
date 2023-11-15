import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private key = 'cad9e13fc39df29887335cb223079816';
  private url = 'https://api.openweathermap.org/data/2.5';
  currentWeatherData = new BehaviorSubject<any>(null);
  dailyWeatherData = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  getWeather(
    // Today weather
    city: string,
    selectedUnit: string,
    latitude: string,
    longitude: string
  ) {
    return this.http.get(
      `${this.url}/weather?q=${city}&appid=${this.key}&units=${selectedUnit}&lat=${latitude}&lon=${longitude}`
    );
  }
  getDailyWeather(
    //5 day weather
    city: string,
    selectedUnit: string,
    lattitude: string,
    longitude: string,
    cnt: string
  ) {
    return this.http.get(
      `${this.url}/forecast?q=${city}&cnt=${cnt}&appid=${this.key}&units=${selectedUnit}&lat=${lattitude}&lon=${longitude}`
    );
  }

  updateCurrentWeatherData(data: any) {
    this.currentWeatherData.next(data); // next() method is used to update the value of BehaviorSubject in other components
  }
  updateDailyWeatherData(data: any) {
    this.dailyWeatherData.next(data); // next() method is used to update the value of BehaviorSubject in other components
  }
}
