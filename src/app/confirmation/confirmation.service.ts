import { Injectable } from '@angular/core';
import { IUser } from '../Models/iuser';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  user!: IUser;

  constructor() {}
  fillUser(inUser: IUser) {
    this.user = { ...this.user, ...inUser };
    window.localStorage.setItem('user', JSON.stringify(this.user));
  }
}
