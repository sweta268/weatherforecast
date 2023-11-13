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
  @Input() FiveDayWeather: any;
  dailyWeatherData: { [key: string]: any } = {};
  dailyForecast: any;
  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.weatherService.fiveDayData.subscribe((data) => {
      if (data) {
        this.dailyForecast = this.processDailyForecast(data);
        console.log(this.dailyForecast);
        // ... process data as needed ...
      }
    });
  }

  private processDailyForecast(bulkWeatherData: { list: any }) {
    const dailyWeatherData: { [key: string]: any } = {};

    if (!bulkWeatherData || !bulkWeatherData.list) {
      console.log('Daily weather data not available');
      return [];
    }

    bulkWeatherData.list.forEach((forecast: any) => {
      const date =
        this.datePipe.transform(forecast.dt * 1000, 'yyyy-MM-dd') || '';

      if (!dailyWeatherData[date]) {
        dailyWeatherData[date] = {
          description: '',
          minTemp: 999,
          maxTemp: -999,
          icon: undefined,
        };
      }

      const weatherData = dailyWeatherData[date];

      if (!weatherData.description.includes(forecast.weather[0].description)) {
        if (weatherData.description !== '') {
          weatherData.description += ', ';
        }
        weatherData.description += forecast.weather[0].description;
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
      date,
      weatherDescription: dailyWeatherData[date].description,
      minTemperature: dailyWeatherData[date].minTemp,
      maxTemperature: dailyWeatherData[date].maxTemp,
      dailyWeatherIcon: dailyWeatherData[date].icon,
    }));
  }
}
