import {Component} from '@angular/core';
import {ApiService} from "../../../service/Api/api.service";
import {UserSessionService} from "../../../service/Session/user-session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userId = 0;
  constructor(
    private api: ApiService,
    private userSessionService: UserSessionService,
    private router: Router
  ) {
    this.userId = Number(this.userSessionService.getUser()?.id)
  }
  doLogout(userId: number){
    this.api.userEndpoint.logout(userId).subscribe(()=>{
      this.router.navigate(['/login'])
    })
  }
}
