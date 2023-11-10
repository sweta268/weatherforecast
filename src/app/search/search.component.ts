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
  feelsLike:any;
  pressure:any;
  temp:any;
  temp_max:any;
  temp_min:any;

  constructor(private router: Router,private weatherService: WeatherService, private httpClient: HttpClient) {}

  searchCity() {
    if (this.cityName) {
           this.weatherService.getWeather(this.cityName).subscribe(data => {
           this.WeatherData = data;
           
           if(this.WeatherData && this.WeatherData.main &&this.WeatherData.main.feels_like)
           {
            
            this.feelsLike=(((parseFloat(this.WeatherData.main.feels_like) - 273.15) * 1.8) + 32 ).toFixed(2)//converting Kelvin to Farenheit
          }
          if(this.WeatherData && this.WeatherData.main && this.WeatherData.main.pressure)
          {
           this.pressure=(((parseFloat(this.WeatherData.main.pressure ) - 273.15) * 1.8) + 32 ).toFixed(2)//converting Kelvin to Farenheit
          
         }if(this.WeatherData && this.WeatherData.main &&this.WeatherData.main.temp)
         {
          this.temp=(((parseFloat(this.WeatherData.main.temp) - 273.15) * 1.8) + 32 ).toFixed(2)//converting Kelvin to Farenheit
        }
        if(this.WeatherData && this.WeatherData.main &&this.WeatherData.main.temp_max)
         {
          this.temp_max=(((parseFloat(this.WeatherData.main.temp_max) - 273.15) * 1.8) + 32).toFixed(2) //converting Kelvin to Farenheit
        }
        if(this.WeatherData && this.WeatherData.main &&this.WeatherData.main.temp_min)
         {
          this.temp_min=(((parseFloat(this.WeatherData.main.temp_min) - 273.15) * 1.8) + 32).toFixed(2) //converting Kelvin to Farenheit
        }
          console.log(this.WeatherData);
        // this.router.navigate(['/forecast', this.cityName]);
      });
  }
  }
}


