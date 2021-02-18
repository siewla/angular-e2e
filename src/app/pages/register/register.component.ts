import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isFormInvalid = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: '',
      agentName: '',
      insuranceName: '',
      dateActivated: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    // console.log(this.registerForm.value);
    this.customerService
      .registerNewCustomer(this.registerForm.value)
      .subscribe(() => this.router.navigate(['/']));
  }
}
