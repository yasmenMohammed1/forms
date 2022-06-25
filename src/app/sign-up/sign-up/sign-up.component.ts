import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'src/app/confirmation/confirmation.service';
import { SliderService } from 'src/app/slider-service.service';
import { MustMatch } from './passwordValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private confirmService: ConfirmationService,
    public sliderService: SliderService
  ) {
    this.signUpForm = fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9_-]+$'),
            Validators.minLength(8),
          ],
        ],

        fullName: [
          '',
          [Validators.required, Validators.pattern('^([^0-9]*)$')],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ],
        ],
        confirmPassword: [''],
        address: fb.group({
          address: [''],
          country: [''],
        }),
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
  }
  ngOnDestroy(): void {
    this.confirmService.fillUser(this.signUpForm.value);
    this.sliderService.validity = true;
  }
  clickedBtn() {
    this.sliderService.nextStatus();
  }

  ngOnInit(): void {
    this.signUpForm.valueChanges.subscribe(() => {
      if (this.signUpForm.valid == true) {
        this.sliderService.validity = false;
      }
    });
  }
  get fullName() {
    return this.signUpForm.get('fullName');
  }

  get userName() {
    return this.signUpForm.get('userName');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
}
