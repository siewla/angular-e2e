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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // @Input() agentID: any;
  agentID: any;
  registerForm: FormGroup;
  isFormInvalid = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
      name: '',
      insuranceName: '',
      dateActivated: '',
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.agentID = params.get('agentID');
    });
  }

  onSubmit() {
    // console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      this.isFormInvalid = true;
      return;
    } else {
      this.customerService
        .registerNewCustomer(this.registerForm.value, this.agentID)
        .subscribe(() => this.router.navigate([`/agent/${this.agentID}`]));
    }
  }
}
