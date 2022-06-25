import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import countries from '../countriesandcities.json';

import { IUser } from '../Models/iuser';
import { SignUpService } from '../sign-up/sign-up.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  user!: IUser;

  constructor(public httpClint: HttpClient, public siService: SignUpService) {
    this.user = this.siService.gitUser();
  }

  getAllContries() {
    return this.httpClint.get('http://41.32.14.34:5000/countries/list/all');
  }
  getRelatedCities(userCountry: string) {
    let params: HttpParams = new HttpParams();

    params.set('countryName ', userCountry);

    return this.httpClint
      .get(`http://41.32.14.34:5000/countries/search/name/${userCountry}`)
      .pipe(retry({ delay: 2000, count: 3 }));
  }
}
