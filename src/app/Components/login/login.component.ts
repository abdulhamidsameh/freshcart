import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/Core/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  constructor(
    private _ToastrService: ToastrService,
    private _AuthServiceService: AuthServiceService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  loginId!: Subscription;
  isLoading: boolean = false;
  errorMsg: string = '';
  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });
  handleLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginId = this._AuthServiceService
        .loginForm(this.loginForm.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.message === 'success') {
              localStorage.setItem('_token', response.token);
              this._Router.navigate(['/home']);
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMsg = err.error.message;
          },
        });
    }
  }
  ngOnDestroy(): void {
    if (this.loginId) {
      this.loginId.unsubscribe();
    }
  }
}
