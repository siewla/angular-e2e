import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CustomerComponent } from './pages/customer/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'customer/:customerID',
    component: CustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
