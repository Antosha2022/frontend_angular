import {Component} from '@angular/core';
import {UserSessionService} from "../../service/Session/user-session.service";
import {ApiService} from "../../service/Api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userId = 0;
  firstName ='';
  lastName ='';
  email ='';
  constructor(
    private api: ApiService,
    private userSessionService: UserSessionService,
    private router: Router
  ) {
    this.userId = Number(this.userSessionService.getUser()?.id)
    this.firstName = this.userSessionService.getUser()!.first_name
    this.lastName = this.userSessionService.getUser()!.last_name
    this.email = this.userSessionService.getUser()!.email
  }
  doLogout(userId: number){
    this.api.userEndpoint.logout(userId).subscribe(()=>{
      this.router.navigate(['/login'])
    })
  }
}
