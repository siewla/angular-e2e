import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

import { SignInData } from '../../../models/signInData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFormInvalid = false;
  areCredentialsInvalid = false;

  constructor(private fb: FormBuilder, private AuthService: AuthService) {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loginForm.valid) {
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(this.loginForm);
  }

  private async checkCredentials(loginForm: any): Promise<any> {
    let credentials = loginForm.value;
    const signInData = new SignInData(credentials.email, credentials.password);
    let response = await this.AuthService.authenticate(signInData);
    if (!response) {
      this.isFormInvalid = false;
      this.areCredentialsInvalid = true;
    }
  }
}
