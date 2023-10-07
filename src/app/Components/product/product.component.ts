import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { CartService } from 'src/app/Core/cart.service';
import { Product } from 'src/app/Core/data';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private _ApiDataService: ApiDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  products: Product[] = [];

  ngOnInit(): void {
    this._ApiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
  }
  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
    });
  }
}
