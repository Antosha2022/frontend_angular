import {Component, OnInit} from '@angular/core';
import {UserSessionService} from "./service/Session/user-session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public userSessionService: UserSessionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // redirect to "login" if not logged in on init
    if (!this.userSessionService.getUser()) {
      this.router.navigate(['/login'])
    }
  }
}
