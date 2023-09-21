import { Component } from '@angular/core';
import {UserSessionService} from "../../../service/Session/user-session.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(
    public userSessionService: UserSessionService,
  ) {
  }
}
