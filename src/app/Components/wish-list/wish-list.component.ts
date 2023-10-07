import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { CartService } from 'src/app/Core/cart.service';
import { Product } from 'src/app/Core/data';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  constructor(
    private _ApiDataService: ApiDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  products!: Product[];
  ngOnInit(): void {
    this.getWishList();
  }
  getWishList(): void {
    this._ApiDataService.viewWishList().subscribe({
      next: (response) => {
        this.products = response.data;
        this._ApiDataService.wishCount.next(response.data.length);
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
  removeWhishList(
    id: string,

    removeIcon: HTMLElement
  ): void {
    this._Renderer2.removeClass(removeIcon, 'd-block');
    this._Renderer2.addClass(removeIcon, 'd-none');
    this._ApiDataService.removeFromWishList(id).subscribe({
      next: (response) => {
        this.getWishList();

        this._ToastrService.success(
          'Product Removed Successfully From WishList'
        );
      },
    });
  }
}
