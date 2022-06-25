import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  status = [{ register: 33.3333 }, { userprofile: 66.66666 }, { confirm: 100 }];
  currentStatus: any;
  validity = true;
  text!: string;
  statusArr = ['register' || '/', 'userprofile', 'confirm'];

  stepRate: any = 0;
  stepSign: string = 'register';
  constructor(private route: Router) {
    this.currentStatus = { register: 33.3333 };
  }
  checkingValidty() {
    this.validity = false;
  }
  setText(text: string) {
    this.text = text;
  }
  nextStatus() {
    switch (this.route.url) {
      case '/register': {
        this.currentStatus = { userprofile: 66.66666 };
        break;
      }

      case '/userprofile':
      case '/confirm': {
        this.currentStatus = { confirm: 100 };
        break;
      }
    }

    this.stepSign = Object.keys(this.currentStatus)[0];
    this.stepRate = Object.values(this.currentStatus)[0];

    this.route.navigateByUrl(`${this.stepSign}`);
    this.route.url == '/'
      ? null
      : localStorage.setItem('lastUrl', this.stepSign);
  }

  nextStepObs(): Observable<number> {
    return new Observable<number>((observer) => {
      let stepsTracker = setInterval(() => {
        if (this.stepRate == 100) {
          this.nextStatus();
          observer.complete();
        } else {
          observer.next(this.stepRate);
        }
      }, 1000);

      return {
        unsubscribe() {
          clearInterval(stepsTracker);
        },
      };
    });
  }
  validty(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let validityTraker = setInterval(() => {
        if (this.stepRate == 100) {
          this.nextStatus();
          observer.complete();
        } else {
          console.log('this.validity', this.validity);
          observer.next(this.validity);
        }
      }, 500);

      return {
        unsubscribe() {
          clearInterval(validityTraker);
        },
      };
    });
  }
}
