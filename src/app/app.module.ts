import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CurrentWeatherComponent,
    DailyWeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
