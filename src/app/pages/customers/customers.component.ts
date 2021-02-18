import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: any;
  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  onDelete(customerID: any) {
    // console.log(customerID, insuranceID);
    this.customerService.deleteCustomer(customerID).subscribe(() =>
      this.customerService.getCustomers().subscribe((customers) => {
        this.customers = customers;
      })
    );
  }
}
