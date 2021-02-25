import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SignUpData } from '../../../models/signUpData';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  typicalEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  signupForm: FormGroup;
  isFormInvalid = false;
  isUserExisted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AuthService: AuthService
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.pattern(this.typicalEmail)],
      password: '',
      firstName: '',
      lastName: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.signupForm.valid) {
      this.isFormInvalid = true;
      return;
    }
    if (!this.invalidDomain()) {
      this.createUser(this.signupForm);
    }
  }

  private async createUser(signupForm: any): Promise<any> {
    let credentials = signupForm.value;
    // console.log(credentials);
    const signUpData = new SignUpData(
      credentials.email,
      bcrypt.hashSync(credentials.password),
      credentials.firstName,
      credentials.lastName
    );
    const response = await this.AuthService.createUser(signUpData);
    console.log('hi', response);
    if (response === 'created') {
      this.isFormInvalid = false;
      this.isUserExisted = false;
      this.router.navigate(['']);
    } else {
      this.isUserExisted = true;
    }
  }

  get email() {
    return this.signupForm.get('email');
  }

  invalidDomain() {
    let str = this.signupForm.value.email;
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
