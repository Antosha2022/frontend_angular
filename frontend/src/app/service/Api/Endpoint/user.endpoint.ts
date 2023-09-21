import {HttpClient} from "@angular/common/http";
import {UserRegisterDto} from "../DTO/user-register.dto";
import {UserAuthDto} from "../DTO/user-auth.dto";

export class UserEndpoint {
  constructor(private http: HttpClient, private apiUrl: string) {}

  public register(user: UserRegisterDto) {
    return this.http.post<{id: number}>(this.apiUrl + '/user', user, {withCredentials: true}).pipe();
  }

  public authenticate(user: UserAuthDto) {
    return this.http.post<{email: string, first_name: string, last_name: string}>(this.apiUrl + '/user/login', user, {withCredentials: true}).pipe()
  }

  public logout(userId: number){
    return this.http.post<object>(this.apiUrl + '/user/logout', userId, {withCredentials: true}).pipe()
  }
}
