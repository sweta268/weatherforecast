import { Component, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrl: './daily-weather.component.scss',
  providers: [DatePipe],
})
export class DailyWeatherComponent {
  dailyWeatherData: { [key: string]: any } = {};
  dailyForecast: any;
  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.weatherService.dailyWeatherData.subscribe((data) => {
      if (data) {
        this.dailyForecast = this.processDailyForecast(data); // Call function to process the data
      }
    });
  }

  private processDailyForecast(bulkWeatherData: { list: any }) {
    const dailyWeatherData: { [key: string]: any } = {};

    if (!bulkWeatherData || !bulkWeatherData.list) {
      console.log('Daily weather data not available'); //Handle error
      return [];
    }

    bulkWeatherData.list.forEach((forecast: any) => {
      //This is the data from the API
      const date =
        this.datePipe.transform(forecast.dt * 1000, 'yyyy-MM-dd') || '';

      if (!dailyWeatherData[date]) {
        // Check if the date is already in the array
        dailyWeatherData[date] = {
          description: '', //Initialize the description
          minTemp: 999, //Initialize the minTemp
          maxTemp: -999, // Initialize the maxTemp
          icon: undefined, //Initialize the icon
        };
      }

      const weatherData = dailyWeatherData[date];

      if (!weatherData.description.includes(forecast.weather[0].description)) {
        if (weatherData.description !== '') {
          //Dont add  comma between weather description for first time but add it all the subsquent times
          weatherData.description += ', ';
        }
        weatherData.description += forecast.weather[0].description; //Concat unique weather description
      }

      if (forecast.main.temp_min < weatherData.minTemp) {
        weatherData.minTemp = forecast.main.temp_min;
      }

      if (forecast.main.temp_max > weatherData.maxTemp) {
        weatherData.maxTemp = forecast.main.temp_max;
      }

      weatherData.icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
    });

    return Object.keys(dailyWeatherData).map((date) => ({
      //Convert object to array
      date,
      weatherDescription: dailyWeatherData[date].description,
      minTemperature: dailyWeatherData[date].minTemp,
      maxTemperature: dailyWeatherData[date].maxTemp,
      dailyWeatherIcon: dailyWeatherData[date].icon,
    }));
  }
}
