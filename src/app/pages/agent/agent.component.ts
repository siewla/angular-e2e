import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
})
export class AgentComponent implements OnInit {
  agent: any = {};
  agentID: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.agentID = params.get('agentID');
    });
    this.authService.getAgentByAgentID(this.agentID).subscribe((agent: any) => {
      this.agent = agent;
      // console.log(this.agent);
    });
  }

  register() {
    this.router.navigate([`register/${this.agentID}`]);
  }
}
