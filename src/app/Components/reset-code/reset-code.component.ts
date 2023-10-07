import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Core/auth-service.service';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.scss'],
})
export class ResetCodeComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _AuthServiceService: AuthServiceService
  ) {}
  checkForm: FormGroup = this._FormBuilder.group({
    resetCode: [''],
  });
  handleForm(): void {
    const checkData: object = this.checkForm.value;
    this._AuthServiceService.resetCode(checkData).subscribe({
      next: (response) => {
        if (this._Router.url.includes('auth')) {
          this._Router.navigate(['/authChangePassword']);
        } else {
          this._Router.navigate(['/changePassword']);
        }
      },
    });
  }
}
