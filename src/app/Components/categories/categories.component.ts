import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/Core/api-data.service';
import { Category } from 'src/app/Core/data';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _ApiDataService: ApiDataService) {}
  categoryData: Category[] = [];
  ngOnInit(): void {
    this._ApiDataService.getCategories().subscribe({
      next: (response) => {
        this.categoryData = response.data;
      },
    });
  }
}
