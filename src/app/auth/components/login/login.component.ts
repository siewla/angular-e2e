import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { SignInData } from '../../../models/signInData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private AuthService: AuthService) {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let credentials = this.loginForm.value;
    const signInData = new SignInData(credentials.email, credentials.password);
    this.AuthService.authenticate(signInData);
  }
}
