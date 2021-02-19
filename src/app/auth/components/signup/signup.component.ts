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
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isFormInvalid = false;
  isUserExisted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AuthService: AuthService
  ) {
    this.signupForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.signupForm.valid) {
      this.isFormInvalid = true;
      return;
    }
    this.createUser(this.signupForm);
  }

  private async createUser(signupForm: any): Promise<any> {
    let credentials = signupForm.value;
    // console.log(credentials);
    const signInData = new SignInData(
      credentials.email,
      bcrypt.hashSync(credentials.password)
    );
    if ((await this.AuthService.createUser(signInData)) === 'created') {
      this.isFormInvalid = false;
      this.isUserExisted = false;
      this.router.navigate(['']);
    } else {
      this.isUserExisted = true;
    }
  }
}
