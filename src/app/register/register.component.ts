import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  get formControls() {
    return this.registerForm.controls;
  }

  hasValidationError(formControlName: string, errorName: string) {
    let errors = this.formControls[formControlName].errors;
    if (errors == null) return false;
    return errors[errorName];
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      age: new FormControl('', [
        Validators.required,
        //18 yaşından küçük mü kontrolü
      ]),

      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  register() {
    console.log(this.registerForm);
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    this.registerService.register(this.registerForm.value).subscribe((response)=>{
      console.log(response)
      this.router.navigateByUrl('/');
    });

  }
}
