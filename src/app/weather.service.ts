import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private key = 'cad9e13fc39df29887335cb223079816';
  private url = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get(`${this.url}/weather?q=${city}&appid=${this.key}`);
  }
}
