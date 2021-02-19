import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../../models/signInData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private readonly mockedUser = new SignInData('admin@mail.com', 'test123');
  // backEndUrL: string = 'https://angular-e2e-backend.herokuapp.com';
  backEndUrL: string = 'http://localhost:3000';

  isAuthenticated = false;

  constructor(private router: Router, private http: HttpClient) {}

  async authenticate(signInData: SignInData): Promise<any> {
    if ((await this.checkCredentials(signInData)) == 'valid') {
      this.isAuthenticated = true;
      this.router.navigate(['']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private async checkCredentials(signInData: SignInData): Promise<any> {
    const agent = {
      email: signInData.getEmail(),
      password: signInData.getPassword(),
    };

    // console.log(agent);

    const response = await new Promise<any>((resolve) =>
      this.http
        .post<any>(`${this.backEndUrL}/agent/login`, agent, httpOptions)
        .subscribe((data) => {
          console.log(data);
          resolve(data);
        })
    );

    return response;

    // console.log(response);
    // return response.closed;
    // return (
    //   this.checkEmail(signInData.getEmail()) &&
    //   this.checkPassword(signInData.getPassword())
    // );
  }

  // private checkEmail(email: string): boolean {
  //   return email === this.mockedUser.getEmail();
  // }

  // private checkPassword(password: string): boolean {
  //   return password === this.mockedUser.getPassword();
  // }

  async createUser(signInData: SignInData): Promise<any> {
    const agent = {
      email: signInData.getEmail(),
      password: signInData.getPassword(),
    };

    const response = await new Promise<any>((resolve) =>
      this.http
        .post<any>(`${this.backEndUrL}/agent`, agent, httpOptions)
        .subscribe((data) => {
          // console.log(data);
          resolve(data);
        })
    );

    return response;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
