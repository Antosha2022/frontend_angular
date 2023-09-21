import { Injectable } from '@angular/core';
import {UserDto} from "../Api/DTO/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private userSessionToken: string|null = null;
  private user: UserDto|null = null

  public getUser(): UserDto|null
  {
    return this.user
  }

  public setUser(user: UserDto): void
  {
    this.user = user
  }

  public getUserSessionToken(): string|null
  {
    return this.userSessionToken
  }

  public setUserSessionToken(token: string): void
  {
    this.userSessionToken = token
  }
}
