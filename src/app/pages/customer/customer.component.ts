import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  @Input() customer: any;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}
}
