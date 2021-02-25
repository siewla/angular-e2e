import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: any = [];
  @Input() agentID: any;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService
      .getCustomersByAgentID(this.agentID)
      .subscribe((customers) => {
        this.customers = customers;
      });
  }

  isPartialActive(insurances: any) {
    let currentDate = new Date();
    for (let insurance of insurances) {
      let insuranceDate = new Date(insurance.dateActivated);
      if (insuranceDate < currentDate) return true;
    }
    return false;
  }

  onDelete(customerID: any) {
    // console.log(customerID, insuranceID);
    this.customerService.deleteCustomer(customerID).subscribe(() =>
      this.customerService
        .getCustomersByAgentID(this.agentID)
        .subscribe((customers) => {
          this.customers = customers;
          // console.log(customers);
        })
    );
  }
}
