# WeatherForecast

This app displays Weather
Input: city / Latitude and longitude
Output: Weather for current day and 5 days after curent day.

- **Overview**
  This project helps users to get the weather based on entered city or latitude and longitude.The users can also switch between celcius and fahrenheit units of measure. the default unit to search is fahrenheit. The users can see weather conditions for current day. They can also get teh weather overview for 5 days after today.

- **Technical Details**
  This project was generated with Angular 17.0.0.
  Please follow the below steps to set up the project

1.  Install node from https://nodejs.org/en/download
2.  Install npm using https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
3.  Install Angular CLI using npm install -g @angular/cli
4.  Install npm packages: npm i
5.  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
6.  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.For the best experience please use chrome browser
7.  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

- **Code Overview**
  The project uses \*\*[Openweather map API]\*\* to display weather details. Weather.service.ts gets the weather from openweathermap API. You can use your own key by replacing the value of key variable. Search component gets calls the api's of weather service to get the weather data. The project is divided into 3 main components.

1. Search weather component gets the user input data and passes the data to the current weather component and daily weather component in raw form.
2. Current weather component processes and displays current weather data.
3. Daily weather component processes and displays daily(5 day) weather data.

   [Openweather map API]: https://openweathermap.org/api
