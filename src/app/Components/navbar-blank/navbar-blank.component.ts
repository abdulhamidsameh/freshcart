import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { CartService } from 'src/app/Core/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss'],
})
export class NavbarBlankComponent implements OnInit {
  cartCount: number = 0;
  whishCount: number = 0;
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _ApiDataService: ApiDataService
  ) {}
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartCount = data;
      },
    });
    this._ApiDataService.wishCount.subscribe({
      next: (data) => {
        this.whishCount = data;
      },
    });
    this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartCount = response.numOfCartItems;
      },
    });
    this._ApiDataService.viewWishList().subscribe({
      next: (response) => {
        this._ApiDataService.wishCount.next(response.data.length);
      },
    });
  }

  signOut(): void {
    localStorage.removeItem('_token');
    this._Router.navigate(['/login']);
  }
}
