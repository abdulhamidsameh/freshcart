import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { CartService } from 'src/app/Core/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  cartId: any = '';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.cartId = parm.get('id');
      },
    });
  }
  checkForm: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });
  handleForm(): void {
    const checkData: object = this.checkForm.value;
    this._CartService.checkOut(this.cartId, checkData).subscribe({
      next: (response) => {
        window.open(response.session.url);
      },
    });
  }
}
