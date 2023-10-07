import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { Category, Product } from 'src/app/Core/data';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Core/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  term: string = '';
  whishListData: string[] = [];
  constructor(
    private _ApiDataService: ApiDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  getAllProductsId!: Subscription;
  getCategoriesId!: Subscription;
  ngOnInit(): void {
    this.getWishList();
    this.getAllProductsId = this._ApiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
    this.getCategoriesId = this._ApiDataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
  }
  categoryCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
  };
  mainSlider: OwlOptions = {
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
        this._ToastrService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
    });
  }
  addWhichList(id: string): void {
    this._ApiDataService.addToWishList(id).subscribe({
      next: (response) => {
        this._ApiDataService.wishCount.next(response.data.length);
        this._ToastrService.success('Product Added Successfully To WishList');

        this.whishListData = response.data;
      },
    });
  }
  removeWhishList(id: string): void {
    this._ApiDataService.removeFromWishList(id).subscribe({
      next: (response) => {
        this._ApiDataService.wishCount.next(response.data.length);
        this._ToastrService.success(
          'Product Removed Successfully From WishList'
        );
        this.whishListData = response.data;
      },
    });
  }
  getWishList(): void {
    this._ApiDataService.viewWishList().subscribe({
      next: (response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.whishListData.push(response.data[i]._id);
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.getAllProductsId.unsubscribe();
    this.getCategoriesId.unsubscribe();
  }
}
