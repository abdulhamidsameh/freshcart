import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Core/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthServiceService: AuthServiceService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  checkForm: FormGroup = this._FormBuilder.group({
    email: [''],
    newPassword: [''],
  });
  handleForm(): void {
    const checkData: object = this.checkForm.value;
    this._AuthServiceService.resetPassword(checkData).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('Password Change');
        if (this._Router.url.includes('auth')) {
          this._Router.navigate(['/login']);
        } else {
          this._Router.navigate(['/home']);
        }
      },
    });
  }
}
