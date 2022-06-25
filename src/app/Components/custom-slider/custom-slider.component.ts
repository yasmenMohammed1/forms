import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { SliderService } from 'src/app/slider-service.service';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss'],
})
export class CustomSliderComponent implements OnInit, OnChanges {
  status = this.progService.stepRate;
  text: string = 'sign up';
  valid: boolean = true;
  constructor(private progService: SliderService, public router: Location) {
    progService.currentStatus;
    switch (this.router.path()) {
      case '/register': {
        this.text = 'register';
        break;
      }
      case '/userprofile': {
        this.text = 'next';
        break;
      }
      case '/confirm': {
        this.text = 'Confirm';
        break;
      }
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.status == this.router.path;
  }

  validitySubscription!: Subscription;
  subscription!: Subscription;
  ngOnInit() {
    this.validitySubscription = this.progService.validty().subscribe({
      next: (data: boolean) => {
        this.valid = data;
      },
      error: (err: string) => {},
      complete: () => {},
    });
    this.subscription = this.progService.nextStepObs().subscribe({
      next: (data: number) => {
        this.status = data;
      },
      error: (err: string) => {},
      complete: () => {},
    });
  }

  clickedBtn() {
    this.progService.nextStatus();
    this.status = this.progService.stepRate;
    this.text = this.router.path() == '/userprofile' ? 'Next' : 'Confirm';
  }
}
