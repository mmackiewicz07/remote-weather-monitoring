import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-measurements-history',
  templateUrl: './measurements-history.component.html',
  styleUrls: ['./measurements-history.component.scss']
})
export class MeasurementsHistoryComponent implements OnInit {

  public ELEMENT_DATA: any[] = [
    { position: 1, name: '2022-02-09' },
    { position: 2, name: '2022-01-16' },
    { position: 3, name: '2022-01-12' },
    { position: 4, name: '2021-12-22' },
    { position: 5, name: '2021-12-02' },
    { position: 6, name: '2021-10-12' },
    { position: 7, name: '2021-10-01' },
    { position: 8, name: '2021-09-21' },
    { position: 9, name: '2021-09-16' },
    { position: 10, name: '2021-09-11' },
  ];

  displayedColumns: string[] = ['position', 'date'];
  dataSource = this.ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  constructor() { }

  ngOnInit(): void {
  }

}
