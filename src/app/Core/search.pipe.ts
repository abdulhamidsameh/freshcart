import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './data';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(productData: Product[], term: string): Product[] {
    return productData.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
