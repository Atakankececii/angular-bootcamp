import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private router:Router
    ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  get formControls() {
    return this.formGroup.controls;
  }

  hasValidationError(formControlName: string, errorName: string) {
    let errors = this.formControls[formControlName].errors;
    if (errors == null) return false;
    return errors[errorName];
  }

  createLoginForm() {
    this.formGroup = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  login() {
    console.log(this.formGroup.value);
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.authService.login(this.formGroup.value).subscribe((response) => {
      console.log(response)
      localStorage.setItem('token',response.token);
      this.router.navigateByUrl('/');

    }


    )

  }
}
