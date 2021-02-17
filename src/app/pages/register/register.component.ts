import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isFormInvalid = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {}
}
