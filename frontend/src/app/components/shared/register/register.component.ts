import {Component} from '@angular/core';
import {UserEndpoint} from "../../../service/Api/Endpoint/user.endpoint";
import {ApiService} from "../../../service/Api/api.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserRegisterDto} from "../../../service/Api/DTO/user-register.dto";
import {UserAuthDto} from "../../../service/Api/DTO/user-auth.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private userEndpoint: UserEndpoint;
  public spinnerShow = false;

  constructor(apiService: ApiService, private router: Router) {
    this.userEndpoint = apiService.userEndpoint
  }

  private checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    if (this.registerForm) {
      const pass = this.registerForm.get('password')!.value
      const confirmPass = this.registerForm.get('confirmPassword')!.value
      return pass === confirmPass ? null : { notSame: true }
    }

    return null;
  }

  registerForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
    ]),
    lastname: new FormControl('', [
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl('', [
      this.checkPasswords,
      Validators.required
    ])
  })

  doRegister() {
    if (this.registerForm.valid) {
      this.spinnerShow = true;
      this.userEndpoint.register(new UserRegisterDto(
        this.registerForm.controls.username.value!,
        this.registerForm.controls.password.value!,
        this.registerForm.controls.firstname.value!,
        this.registerForm.controls.lastname.value!,
      )).subscribe(result => {
        // here successfully registered, start autologin
        this.userEndpoint.authenticate(new UserAuthDto(
          this.registerForm.controls.username.value!,
          this.registerForm.controls.password.value!,
        )).subscribe(result => {
          // successfully logged in here, redirect to home
          // timeout need for save auth-data on BE
          //   setTimeout(()=>{
          //   }, 50)
          this.router.navigate(['/dashboard'])
        })
      })
    }
  }
}
