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

  getWeather(city: string, selectedUnit: string) {
    return this.http.get(
      `${this.url}/weather?q=${city}&appid=${this.key}&units=${selectedUnit}`
    );
  }
  getFiveDayWeather(city: string, selectedUnit: string, cnt: string) {
    return this.http.get(
      `${this.url}/forecast?q=${city}&cnt=${cnt}&appid=${this.key}&units=${selectedUnit}`
    );
  }
  getWeatherBylatLong(
    latitude: string,
    longitude: string,
    selectedUnit: string
  ) {
    return this.http.get(
      `${this.url}/weather?lat=${latitude}&lon=${longitude}&appid=${this.key}&units=${selectedUnit}`
    );
  }
  getFiveDayWeatherBylatLong(
    latitude: string,
    longitude: string,
    selectedUnit: string
  ) {
    return this.http.get(
      `${this.url}/forecast?lat=${latitude}&lon=${longitude}&appid=${this.key}&units=${selectedUnit}`
    );
  }
  updateCurrentWeatherData(data: any) {
    this.currentWeatherData.next(data);
  }
  updateFiveDayWeatherData(data: any) {
    this.fiveDayData.next(data);
  }
}
