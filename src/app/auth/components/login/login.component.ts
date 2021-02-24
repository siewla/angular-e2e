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
  typicalEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isFormInvalid = false;
  areCredentialsInvalid = false;
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.pattern(this.typicalEmail)),
    password: new FormControl(null),
  });

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loginForm.valid) {
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    if (!this.invalidDomain()) {
      this.checkCredentials(this.loginForm);
    }
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

  get email() {
    return this.loginForm.get('email');
  }

  invalidDomain() {
    let str = this.loginForm.value.email;
    let emailEle = document.getElementById('email');
    if (str.match(/test/)) {
      if (emailEle !== null) {
        emailEle.classList.add('invalid');
        emailEle.classList.remove('valid');
      }
      return true;
    }
    if (emailEle !== null) {
      emailEle.classList.remove('invalid');
      emailEle.classList.add('valid');
    }
    return false;
  }
}
