import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/Core/api-data.service';
import jwt_decode from 'jwt-decode';
import { AllOrders } from 'src/app/Core/data';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent implements OnInit {
  constructor(private _ApiDataService: ApiDataService) {}
  allOrdersData!: AllOrders[];
  ngOnInit(): void {
    let token: any = localStorage.getItem('_token');
    let decoded: any = jwt_decode(token);
    let id: string = decoded.id;
    this._ApiDataService.getAllOrders(id).subscribe({
      next: (response) => {
        this.allOrdersData = response;
      },
    });
  }
}
