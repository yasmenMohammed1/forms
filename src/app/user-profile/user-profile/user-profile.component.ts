import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';
import fakeAPI from '../../countriesandcities.json';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
// import { AbstractControl } from '@angular/forms';

import { ConfirmationService } from 'src/app/confirmation/confirmation.service';
import { SliderService } from 'src/app/slider-service.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  userCountries: string[] = Object.keys(fakeAPI);
  options = Object.keys(fakeAPI);
  selectedCountry!: string;

  constructor(
    private confirmService: ConfirmationService,
    private fb: FormBuilder,
    public upService: UserProfileService,
    private sliderService: SliderService
  ) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: [''],
      age: ['', [Validators.pattern('^[0-9]*$'), Validators.min(8)]],
      address: this.fb.group({
        countryOfBirth: [''],
        address: [''],
      }),
    });

    this.userForm
      .get('address')!
      .get('countryOfBirth')
      ?.valueChanges.pipe(debounceTime(800))
      .subscribe((response) => {
        this.filterData(response);
      });
  }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe(() => {
      if (this.userForm.valid) {
        this.sliderService.checkingValidty();
      }
    });
    this.userCountries = Object.keys(fakeAPI);
  }
  ngOnDestroy(): void {
    this.confirmService.fillUser(this.userForm.value);
    this.sliderService.validity = true;
  }

  // TODO: after adding my api
  // getCities() {
  //   this.upService.getAllContries().subscribe({
  //     next: (data: any) => {
  //       console.log(
  //         data.filter((country: any) => {
  //           return country.data;
  //         })
  //       );

  //       this.userCountries = data.reduce(
  //         (city: { countryName: string }) => city.countryName
  //       );
  //       this.options = data;
  //     },
  //     error: (error: Error) => {
  //       this.userCountries = Object.keys(fakeAPI);
  //     },
  //   });
  // }
  filterData(enteredData: string) {
    return (this.options = this.userCountries.filter((country) => {
      return (
        country.toLowerCase().indexOf(enteredData.toLocaleLowerCase()) > -1
      );
    }));
  }
  get fullNameErr() {
    return this.userForm.get('fullName');
  }
  get passwordErr() {
    return this.userForm.get('password');
  }
  get CpasswordErr() {
    return this.userForm.get('confirmPassword');
  }
  get userNameErr() {
    return this.userForm.get('userName');
  }
}
