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
  fiveDayData = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  getWeather(
    city: string,
    selectedUnit: string,
    latitude: string,
    longitude: string
  ) {
    return this.http.get(
      `${this.url}/weather?q=${city}&appid=${this.key}&units=${selectedUnit}&lat=${latitude}&lon=${longitude}`
    );
  }
  getFiveDayWeather(
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
    this.currentWeatherData.next(data);
  }
  updateFiveDayWeatherData(data: any) {
    this.fiveDayData.next(data);
  }
}
