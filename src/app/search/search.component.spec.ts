import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FormBuilder,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { SearchComponent } from './search.component';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let weatherService: WeatherService;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
      declarations: [SearchComponent],
      providers: [NgForm, WeatherService, DatePipe],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when form is submitted without data', () => {
    const form = {
      valid: true,
      value: {
        cityName: '',
        latitude: '',
        longitude: '',
      },
    } as any;

    component.onSubmit(form);

    expect(component.errorMessage).toEqual(
      'Please enter city name or latitude and longitude'
    );
  });

  it('should call searchWeather method with temperatureUnit when form is submitted with valid data', () => {
    const unit = 'Imperial';
    const form = {
      valid: true,
    } as any;
    const cityInputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[name="cityName"]');
    const latitudeInputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[name="latitude"]');
    const longitudeInputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[name="longitude"]');

    cityInputElement.value = 'New York';
    latitudeInputElement.value = '';
    longitudeInputElement.value = '';
    cityInputElement.dispatchEvent(new Event('input')); // Simulate input event
    latitudeInputElement.dispatchEvent(new Event('input')); // Simulate input event
    longitudeInputElement.dispatchEvent(new Event('input')); // Simulate input event

    spyOn(component, 'searchWeather');
    component.onSubmit(form);
    expect(component.searchWeather).toHaveBeenCalledWith('');
  });

  it('should handle error when API calls fail', fakeAsync(() => {
    spyOn(weatherService, 'getWeather').and.returnValue(
      throwError({ error: { message: 'Error!' } })
    );
    spyOn(weatherService, 'getDailyWeather').and.returnValue(
      throwError({ error: { message: 'Error!' } })
    );

    component.cityName = 'New York';
    component.searchWeather('metric');
    tick();

    expect(component.errorMessage).toEqual('Error!');
  }));
});
