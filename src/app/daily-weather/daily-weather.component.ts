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
  dailyWeatherData: { [key: string]: any[] } = {};
  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {}
  ngOnInit() {
    this.weatherService.fiveDayData.subscribe((data) => {
      if (data) {
        this.processDailyForecast(data);
        // ... process data as needed ...
      }
    });
  }

  private processDailyForecast(bulkWeatherData: { list: any }) {
    var previousDate: any;
    var averageWeatherDescription: any;
    var minTemp: any;
    var maxTemp: any;
    var dailyWeatherIcon: any;
    console.log(this.dailyWeatherData);
    this.dailyWeatherData = {};

    //This function was created because data received from API is in 3 hour steps but the requirement is to get daily weather forecast. So we need to aggregate data for each date from 3 hour steps
    // Group forecast entries by day

    if (!bulkWeatherData || !bulkWeatherData.list) {
      // Either this.fiveDayForecast is not defined or it doesn't have a 'list' property
      console.log('Daily weather data not available'); //Handle on FE
      return;
    }
    bulkWeatherData.list.forEach((forecast: any) => {
      const date =
        this.datePipe.transform(forecast.dt * 1000, 'yyyy-MM-dd') || '';

      if (!this.dailyWeatherData[date]) {
        // Check If array does not have this date weather data create a new
        if (previousDate) {
          // Check If this date is a new date then we need to add all the aggregated weather data to previous date object
          this.buildEachDayWeatherArray(
            previousDate,
            averageWeatherDescription,
            minTemp,
            maxTemp,
            dailyWeatherIcon
          );
        }
        this.dailyWeatherData[date] = []; //For a new date weather data create an empty object where all the weather data will be pushed
        minTemp = 99999; //initialize with big number so any weather data which has min temp lower gets presidence
        maxTemp = 0; //initialize with low number so any weather data which has max temp lower gets presidence

        averageWeatherDescription = ''; // Short Description of weather
      }

      if (forecast.main.temp_min < minTemp) {
        minTemp = forecast.main.temp_min; //Find min temp for each day from each 3 hour min temp for each date
      }
      if (forecast.main.temp_max > maxTemp) {
        maxTemp = forecast.main.temp_max; //Find max temp for each day from each 3 hour max temp for each date
      }
      if (
        !averageWeatherDescription.includes(
          //For weather description we will concat the unique weather description Eg:Rainy, cloudy, rainy. Will have that date weather description:Rainly,Cloudy
          forecast.weather[0].description
        )
      ) {
        if (averageWeatherDescription != '') {
          //If its 1st weather description we dont need to add comma
          averageWeatherDescription = averageWeatherDescription.concat(', '); //else we need comma
        }
        averageWeatherDescription = averageWeatherDescription.concat(
          forecast.weather[0].description //Concat unique weather data
        );
      }
      dailyWeatherIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`; //Weather icon

      previousDate = date;
      //Save the current date in a variable called previous date so that in next iteration if date changes we will use previous date to insert all the aggreagted data in an object for the previous date
    });
    this.buildEachDayWeatherArray(
      previousDate,
      averageWeatherDescription,
      minTemp,
      maxTemp,
      dailyWeatherIcon
    ); //Push all the aggregated weather data to previous date object
  }

  buildEachDayWeatherArray(
    previousDate: string,
    averageWeatherDescription: string,
    minTemp: string,
    maxTemp: string,
    dailyWeatherIcon: string
  ) {
    const eachDayWeather = {
      // Create a object to show the each day weather data on FE
      date: previousDate,
      weatherDescription: averageWeatherDescription,
      minTemperature: minTemp,
      maxTemperature: maxTemp,
      dailyWeatherIcon: dailyWeatherIcon,
    };

    this.dailyWeatherData[previousDate].push(eachDayWeather);
  }
}
