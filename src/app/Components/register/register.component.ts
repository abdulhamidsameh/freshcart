import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/Core/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  constructor(
    private _ToastrService: ToastrService,
    private _AuthServiceService: AuthServiceService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  isLoading: boolean = false;
  registerId!: Subscription;
  errorMsg: string = '';
  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { Validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value === '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ confirm: true });
    }
  }
  handleRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerId = this._AuthServiceService
        .registerForm(this.registerForm.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.message === 'success') {
              this._Router.navigate(['/login']);
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
    if (this.registerId) {
      this.registerId.unsubscribe();
    }
  }
}
