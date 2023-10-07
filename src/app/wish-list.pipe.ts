import { Pipe, PipeTransform, Renderer2 } from '@angular/core';
import { Product } from './Core/data';

@Pipe({
  name: 'wishList',
})
export class WishListPipe implements PipeTransform {
  constructor(private _Renderer2: Renderer2) {}
  transform(products: Product[], wish: Product[]): Product[] {
    return products;
  }
}
