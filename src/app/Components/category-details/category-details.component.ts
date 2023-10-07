import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { Category, Subcategory } from 'src/app/Core/data';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApiDataService: ApiDataService
  ) {}
  categoryId: null | string = '';
  categoryData!: Category;
  subCategoryData!: Subcategory[];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.categoryId = parm.get('id');
      },
    });
    this._ApiDataService.getSpecificCategory(this.categoryId).subscribe({
      next: (response) => {
        this.categoryData = response.data;
      },
    });
    this._ApiDataService.getSubCategoryInCategory(this.categoryId).subscribe({
      next: (response) => {
        this.subCategoryData = response.data;
      },
    });
  }
}
