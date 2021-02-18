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
  // backEndUrL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${this.backEndUrL}/customers/all`);
  }

  getCustomerByID(customerID: any): Observable<any> {
    return this.http.get<any>(`${this.backEndUrL}/customer/${customerID}`);
  }

  deleteCustomer(customerID: any): Observable<any> {
    return this.http.delete<any>(`${this.backEndUrL}/customer/${customerID}`);
  }

  deleteInsurance(customerID: any, insuranceID: any): Observable<any> {
    return this.http.delete<any>(
      `${this.backEndUrL}/customer/${customerID}/insurance/${insuranceID}`
    );
  }

  registerNewCustomer(customerData: any) {
    const customer = {
      name: customerData.name,
      insurances: [
        {
          name: customerData.insuranceName,
          agent: customerData.agentName,
          dateActivated: customerData.dateActivated,
        },
      ],
    };

    // console.log(customer);

    return this.http.post<any>(
      `${this.backEndUrL}/customer`,
      customer,
      httpOptions
    );
  }

  addNewInsurance(customerID: any, insuranceData: any) {
    const insurance = {
      name: insuranceData.insuranceName,
      agent: insuranceData.agentName,
      dateActivated: insuranceData.dateActivated,
    };

    // console.log(insurance);

    return this.http.put<any>(
      `${this.backEndUrL}/customer/${customerID}`,
      insurance,
      httpOptions
    );
  }
}
