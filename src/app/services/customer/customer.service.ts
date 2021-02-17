import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  backEndUrL: string = 'https://angular-e2e-backend.herokuapp.com';
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${this.backEndUrL}/customers/all`);
  }

  getCustomerByID(customerID: any): Observable<any> {
    return this.http.get<any>(`${this.backEndUrL}/customer/${customerID}`);
  }
}
