import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { CartService } from 'src/app/Core/cart.service';
import { Product } from 'src/app/Core/data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _ApiDataService: ApiDataService
  ) {}
  cartData: any = {};
  cartCount: number = 0;

  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartData = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
    });
  }
  removeItem(id: string): void {
    this._CartService.removeSpecificCartItem(id).subscribe({
      next: (response) => {
        this.cartData = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success('Product Removed Successfully');
      },
    });
  }
  changeCount(id: string, count: number): void {
    if (count >= 1) {
      this._CartService.updateQuantity(id, count).subscribe({
        next: (response) => {
          this.cartData = response.data;
          this._ToastrService.success('Product Quantity Updated Successfully');
        },
      });
    }
  }
}
