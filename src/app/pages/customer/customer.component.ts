import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customer: any = {};
  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let customerID = params.get('customerID');
      this.customerService.getCustomerByID(customerID).subscribe((customer) => {
        this.customer = customer;
      });
    });
  }

  onDelete(customerID: any, insuranceID: any) {
    // console.log(customerID, insuranceID);
    this.customerService
      .deleteInsurance(customerID, insuranceID)
      .subscribe(() =>
        this.customerService
          .getCustomerByID(customerID)
          .subscribe((customer) => {
            this.customer = customer;
          })
      );
  }
}
