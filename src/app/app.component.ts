import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-e2e';
  agentID: any;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  logout() {
    this.authService.logout();
  }
}
