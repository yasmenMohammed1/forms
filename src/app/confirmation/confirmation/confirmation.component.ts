import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Models/iuser';
import { SliderService } from 'src/app/slider-service.service';
import { ConfirmationService } from '../confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  confirmationForm: FormGroup;
  constructor(
    private confirmService: ConfirmationService,
    fb: FormBuilder,
    private sliderService: SliderService
  ) {
    this.confirmationForm = fb.group({
      fullName: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }],
      firstname: [{ value: '', disabled: true }],
      lastname: [{ value: '', disabled: true }],
      age: [{ value: '', disabled: true }],
      address: fb.group({
        address: [{ value: '', disabled: true }],
        countryOfBirth: [{ value: '', disabled: true }],
      }),
    });
  }
  ngOnDestroy(): void {
    this.sliderService.validity = true;
  }

  user!: IUser;
  ngOnInit(): void {
    this.confirmationForm.valueChanges.subscribe(() => {
      if (this.confirmationForm.valid) {
        this.sliderService.checkingValidty();
      }
    });
    if (this.confirmService.user == undefined) {
      this.confirmationForm.patchValue(
        JSON.parse(window.localStorage.getItem('user')!)
      );
      this.user = JSON.parse(window.localStorage.getItem('user')!);
    } else {
      this.user = this.confirmService.user;
      this.confirmationForm.patchValue(this.user);
    }
  }
}
