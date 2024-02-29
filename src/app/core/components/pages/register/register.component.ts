import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IdentityDocumentType } from 'src/app/core/enums/identityDocType';
import { User, UserReq } from 'src/app/core/models/user.model';
import { startRegisterAction } from 'src/app/core/store/user/user.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, private store: Store) {}

  identityTypes = Object.keys(IdentityDocumentType);
  signUpForm!: FormGroup;
  first_name_Error: any;
  last_name_Error: any;
  email_Error: any;
  password_Error: any;
  confirm_pass_Error: any;
  nationality_Error: any;
  identityDocument_Error: any;
  identityNumber_Error: any;

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
      confirmPassword: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ])
      ),
      nationality: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      identityDocument: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      identityNumber: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(8),
        ])
      ),
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      if (
        this.signUpForm.value.confirmPassword === this.signUpForm.value.password
      ) {
        const user: UserReq = {
          first_name: this.signUpForm.value.first_name,
          last_name: this.signUpForm.value.last_name,
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password,
          nationality: this.signUpForm.value.nationality,
          accessionDate: new Date(),
          identityDocument: this.signUpForm.value.identityDocument,
          identityNumber: this.signUpForm.value.identityNumber,
        };

        this.store.dispatch(startRegisterAction({ user }));
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

    if (this.signUpForm?.get('nationality')?.hasError('required')) {
      this.nationality_Error = 'Nationality is required.';
    } else {
      this.nationality_Error = '';
    }

    if (this.signUpForm?.get('email')?.hasError('required')) {
      this.email_Error = 'Email is required.';
    } else if (this.signUpForm?.get('email')?.hasError('email')) {
      this.email_Error = 'This filed must be a valid email.';
    } else {
      this.email_Error = '';
    }

    if (this.signUpForm?.get('identityDocument')?.hasError('required')) {
      this.identityDocument_Error = 'Document Identity is required.';
    } else {
      this.identityDocument_Error = '';
    }
    if (this.signUpForm?.get('identityNumber')?.hasError('required')) {
      this.identityNumber_Error = 'Identity Number is required.';
    } else if (this.signUpForm?.get('identityNumber')?.hasError('minlength')) {
      this.identityNumber_Error =
        'Identity Number must be at least 7 characters long.';
    } else if (this.signUpForm?.get('identityNumber')?.hasError('maxlength')) {
      this.identityNumber_Error =
        'Identity Number must be less than 8 characters long.';
    } else {
      this.identityNumber_Error = '';
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
