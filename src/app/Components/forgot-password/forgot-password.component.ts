import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Core/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthServiceService: AuthServiceService,
    private _Router: Router
  ) {}
  checkForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.email, Validators.required]],
  });
  handleForm(): void {
    const checkData: any = this.checkForm.value;
    this._AuthServiceService.forgotPassword(checkData).subscribe({
      next: (response) => {
        if (this._Router.url.includes('auth')) {
          this._Router.navigate(['/authResetCode']);
        } else {
          this._Router.navigate(['/resetCode']);
        }
      },
    });
  }
}
