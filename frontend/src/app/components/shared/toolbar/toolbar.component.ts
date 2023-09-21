import {Component} from '@angular/core';
import {UserSessionService} from "../../../service/Session/user-session.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(
    public userSessionService: UserSessionService,
  ) {
  }

  title = 'Species Collector';
}
