import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // customers: any;
  constructor(
    public authService: AuthService
  ) // public customerService: CustomerService
  {}

  ngOnInit(): void {
    // this.customerService.getCustomers().subscribe((customers) => {
    //   this.customers = customers;
    // });
  }
}
