import { Injectable } from '@angular/core';
import { IUser } from '../Models/iuser';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  user: IUser = {
    fullName: '',
    userName: '',
    address: {
      countryOfBirth: null,
      address: null,
    },
    password: '',
  };
  constructor() {}

  gitUser() {
    return this.user;
  }
}
