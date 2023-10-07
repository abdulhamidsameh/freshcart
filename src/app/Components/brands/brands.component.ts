import { Brand } from './../../Core/data';
import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/Core/api-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  constructor(private _ApiDataService: ApiDataService) {}
  brandsData: Brand[] = [];
  ngOnInit(): void {
    this._ApiDataService.getBrands().subscribe({
      next: (response) => {
        this.brandsData = response.data;
      },
    });
  }
}
