import { Injectable } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SliderService } from '../slider-service.service';

@Injectable({
  providedIn: 'root',
})
export class NotReachedScreenGuard implements CanActivate {
  currentScreen? = localStorage.getItem('lastUrl');
  lastHittedstatus = this.location.path().replace('/', '');
  constructor(
    public router: Router,
    public location: Location,
    public sService: SliderService
  ) {}
  setCurrentScreen() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      (localStorage.getItem('lastUrl') === null && state.url == '/register') ||
      (localStorage.getItem('lastUrl') === null && state.url == '/')
    ) {
      return true;
    } else if (state.url == `/${localStorage.getItem('lastUrl')}`) {
      return true;
    } else {
      console.log(state.url);

      alert(
        localStorage.getItem('lastUrl') == null
          ? 'sign up first'
          : 'complete info'
      );

      // localStorage.clear();
      this.router.navigateByUrl(
        localStorage.getItem('lastUrl') == null
          ? '/register'
          : `/${localStorage.getItem('lastUrl')}`
      );
      return false;
    }
  }
}
