import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { Brand } from 'src/app/Core/data';

@Component({
  selector: 'app-brands-details',
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.scss'],
})
export class BrandsDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApiDataService: ApiDataService
  ) {}
  brandId: string | null = '';
  brandData!: Brand;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.brandId = parm.get('id');
      },
    });
    this._ApiDataService.getSpecificBrand(this.brandId).subscribe({
      next: (response) => {
        this.brandData = response.data;
      },
    });
  }
}
