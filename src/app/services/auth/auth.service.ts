import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../../models/signInData';
import { SignUpData } from '../../models/signUpData';
import { Observable } from 'rxjs';

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
  backEndUrL: string = 'https://angular-e2e-backend.herokuapp.com';
  // backEndUrL: string = 'http://localhost:3000';

  isAuthenticated = false;

  constructor(private router: Router, private http: HttpClient) {}

  async authenticate(signInData: SignInData): Promise<any> {
    let response = await this.checkCredentials(signInData);
    // console.log(response);
    if (response.email) {
      this.isAuthenticated = true;
      this.router.navigate([`/agent/${response._id}`]);
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
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
          // console.log(data);
          resolve(data);
        })
    );

    return response;
  }

  async createUser(signUpData: SignUpData): Promise<any> {
    const agent = {
      email: signUpData.getEmail(),
      password: signUpData.getPassword(),
      firstName: signUpData.getFirstName(),
      lastName: signUpData.getLastName(),
    };

    const response = await new Promise<any>((resolve) =>
      this.http
        .post<any>(`${this.backEndUrL}/agent`, agent, httpOptions)
        .subscribe((data) => {
          console.log(data);
          resolve(data);
        })
    );

    return response;
  }

  getAgentByAgentID(agentID: string) {
    return this.http.get(`${this.backEndUrL}/agent/${agentID}`);
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
