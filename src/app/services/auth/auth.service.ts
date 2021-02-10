import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../../models/signInData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly mockedUser = new SignInData('admin@mail.com', 'test123');
  isAuthenticated = false;
  constructor(private router: Router) {}

  authenticate(signInData: SignInData): boolean {
    if (this.checkCredentials(signInData)) {
      this.isAuthenticated = true;
      this.router.navigate(['']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private checkCredentials(signInData: SignInData): boolean {
    return (
      this.checkEmail(signInData.getEmail()) &&
      this.checkPassword(signInData.getPassword())
    );
  }

  private checkEmail(email: string): boolean {
    return email === this.mockedUser.getEmail();
  }

  private checkPassword(password: string): boolean {
    return password === this.mockedUser.getPassword();
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
