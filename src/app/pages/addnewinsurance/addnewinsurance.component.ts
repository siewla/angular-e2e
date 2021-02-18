import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-addnewinsurance',
  templateUrl: './addnewinsurance.component.html',
  styleUrls: ['./addnewinsurance.component.css'],
})
export class AddnewinsuranceComponent implements OnInit {
  @Input() customerID: any;
  newInsuranceForm: FormGroup;
  isFormInvalid = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.newInsuranceForm = this.fb.group({
      agentName: '',
      insuranceName: '',
      dateActivated: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.newInsuranceForm.value);
    console.log(this.customerID);
    this.customerService
      .addNewInsurance(this.customerID, this.newInsuranceForm.value)
      .subscribe(() => this.router.navigate([`/`]));
  }
}
