import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserEndpoint} from "../../../service/Api/Endpoint/user.endpoint";
import {ApiService} from "../../../service/Api/api.service";
import {UserAuthDto} from "../../../service/Api/DTO/user-auth.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private userEndpoint: UserEndpoint
  spinnerShow = false;

  constructor(apiService: ApiService, private router: Router) {
    this.userEndpoint = apiService.userEndpoint
  }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  })

  doLogin(): void {
    if (this.loginForm.valid) {
      this.spinnerShow = true
      this.userEndpoint.authenticate(new UserAuthDto(
        this.loginForm.controls.username.value!,
        this.loginForm.controls.password.value!
      )).subscribe(result => {
        // successful login here
        this.router.navigate(['/dashboard'])
      })
    }
  }
}
