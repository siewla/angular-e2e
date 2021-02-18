import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { AddnewinsuranceComponent } from './pages/addnewinsurance/addnewinsurance.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    CustomerComponent,
    RegisterComponent,
    AddnewinsuranceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
