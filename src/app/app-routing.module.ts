import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { AgentComponent } from './pages/agent/agent.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer/:customerID',
    component: CustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'agent/:agentID',
    component: AgentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register/:agentID',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
