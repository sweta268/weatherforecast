import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent {
  cityName: string = '';
  WeatherData: any;
  constructor(private router: Router,private weatherService: WeatherService, private httpClient: HttpClient) {}

  searchCity() {
    if (this.cityName) {
      console.log(this.cityName);
        this.weatherService.getWeather(this.cityName).subscribe(data => {
          this.WeatherData = data;
          console.log(this.WeatherData);
        // this.router.navigate(['/forecast', this.cityName]);
      });
  }
  }
}
