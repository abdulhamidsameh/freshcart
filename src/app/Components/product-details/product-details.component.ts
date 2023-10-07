import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { CartService } from 'src/app/Core/cart.service';
import { Product } from 'src/app/Core/data';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApiDataService: ApiDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  productId: string | null = '';
  productDetails!: Product;
  specificProductId!: Subscription;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      },
    });

    this.specificProductId = this._ApiDataService
      .getSpecificProduct(this.productId)
      .subscribe({
        next: (response) => {
          this.productDetails = response.data;
        },
      });
  }
  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
    autoplay: true,
  };
  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      },
    });
  }
  ngOnDestroy(): void {
    this.specificProductId.unsubscribe();
  }
}
