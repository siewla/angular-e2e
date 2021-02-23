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
  @Input() agentID: any;

  newInsuranceForm: FormGroup;
  isFormInvalid = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.newInsuranceForm = this.fb.group({
      insuranceName: '',
      dateActivated: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.newInsuranceForm.valid) {
      this.isFormInvalid = true;
      return;
    } else {
      this.customerService
        .addNewInsurance(
          this.agentID,
          this.customerID,
          this.newInsuranceForm.value
        )
        .subscribe(() => this.router.navigate([`/agent/${this.agentID}`]));
    }
  }
}
