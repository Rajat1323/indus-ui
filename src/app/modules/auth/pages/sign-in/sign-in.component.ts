import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SharedModule } from 'src/app/shared/models/shared.module';
import { catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [SharedModule, ButtonComponent],
})
export class SignInComponent {
  submitted = false;
  passwordTextType!: boolean;

  public constructor(
    private router: Router,
    private _fb: FormBuilder,
    private authContext: AuthService
  ) { }

  get f() {
    return this.formGroupContext.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  formGroupContext: FormGroup = this._fb.group({
    userName: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  message: any = { error: '', isSubmitting: false };
  showPassword: boolean = false;

  handleLoginFormSubmit() {
    this.submitted = true;
    this.message = { ...this.message, isSubmitting: true };
    let password = btoa(this.formGroupContext.get('password')?.value ?? '');
    let userName = this.formGroupContext.get('userName')?.value ?? '';
    this.authContext.login({ userName, password })
      .pipe(catchError(reason => {
        this.message = { ...this.message, error: 'Invalid credentials!', isSubmitting: false };
        throw new Error(reason.error);
      }))
      .subscribe((response: any) => {
        this.message = { ...this.message, success: response.message, isSubmitting: false };
        if (response.data) {
          this.authContext.token = response.data;
          this.authContext.tokenExpiry = response.expires_in;
          this.router.navigate(['/dashboard/analytical']);
        }
        else this.message = { ...this.message, error: response.message };
      });
  }
}
