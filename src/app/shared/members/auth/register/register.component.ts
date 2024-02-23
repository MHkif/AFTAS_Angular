import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private builder: FormBuilder) {}

  signUpForm!: FormGroup;
  first_name_Error: any;
  last_name_Error: any;
  email_Error: any;
  password_Error: any;
  confirm_pass_Error: any;

  ngOnInit(): void {
    this.signUpForm = this.builder.group({
      first_name: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ])
      ),
      last_name: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ])
      ),
      email: this.builder.control(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ])
      ),
      areaActivity: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      profile: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      confirmPassword: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ])
      ),
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      if (
        this.signUpForm.value.confirmPassword === this.signUpForm.value.password
      ) {
        console.log('form', this.signUpForm.value);
        alert('Submit Form');
      } else {
        this.confirm_pass_Error = 'Mismatch Password';
      }
    }

    if (this.signUpForm?.get('first_name')?.hasError('required')) {
      this.first_name_Error = 'First name is required.';
    } else if (this.signUpForm?.get('first_name')?.hasError('minlength')) {
      this.first_name_Error = 'First name must be at least 8 characters long.';
    } else if (this.signUpForm?.get('first_name')?.hasError('maxlength')) {
      this.first_name_Error =
        'First name must be less than 30 characters long.';
    } else {
      this.first_name_Error = '';
    }

    if (this.signUpForm?.get('last_name')?.hasError('required')) {
      this.last_name_Error = 'Last name is required.';
    } else if (this.signUpForm?.get('last_name')?.hasError('minlength')) {
      this.last_name_Error = ' Last name must be at least 8 characters long.';
    } else if (this.signUpForm?.get('last_name')?.hasError('maxlength')) {
      this.last_name_Error = 'Last name must be less than 30 characters long.';
    } else {
      this.last_name_Error = '';
    }

    if (this.signUpForm?.get('email')?.hasError('required')) {
      this.email_Error = 'Email is required.';
    } else if (this.signUpForm?.get('email')?.hasError('email')) {
      this.email_Error = 'This filed must be a valid email.';
    } else {
      this.email_Error = '';
    }

    if (this.signUpForm?.get('password')?.hasError('required')) {
      this.password_Error = 'Password is required.';
    } else if (this.signUpForm?.get('password')?.hasError('minlength')) {
      this.password_Error = 'Password must be at least 8 characters long.';
    } else if (this.signUpForm?.get('password')?.hasError('maxlength')) {
      this.password_Error = 'Password must be less than 30 characters long.';
    } else {
      this.password_Error = '';
    }

    if (this.signUpForm?.get('confirmPassword')?.hasError('required')) {
      this.confirm_pass_Error = 'Confirm Password is required.';
    } else if (this.signUpForm?.get('confirmPassword')?.hasError('minlength')) {
      this.confirm_pass_Error =
        'Confirm Password must be at least 8 characters long.';
    } else if (this.signUpForm?.get('confirmPassword')?.hasError('maxlength')) {
      this.confirm_pass_Error =
        'Confirm Password must be less than 30 characters long.';
    } else if (
      this.signUpForm.value.confirmPassword != this.signUpForm.value.password
    ) {
      this.confirm_pass_Error = 'Mismatch password.';
    } else {
      this.confirm_pass_Error = '';
    }
  }
}
