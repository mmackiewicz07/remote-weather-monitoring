import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { sortBy } from 'lodash';
import * as moment from 'moment';
import { ReplaySubject, takeUntil } from 'rxjs';
import { measurementsState } from '../measurements/store/measurements.reducers';
import { MeasurementsStore } from './measurment-history-details/measurements-store.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-measurements-history',
  templateUrl: './measurements-history.component.html',
  styleUrls: ['./measurements-history.component.scss'],
})
export class MeasurementsHistoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public ELEMENT_DATA: any[] = [];
  public displayedColumns: string[] = ['position', 'date'];
  public clickedRows = new Set<PeriodicElement>();
  public dataSource?: any;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private router: Router,
    private fbs: AngularFirestore,
    private route: ActivatedRoute,
    public store: MeasurementsStore
  ) {}

  public ngOnInit() {
    this.fbs
      .collection('measurements')
      .valueChanges()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((x) => {
        this.ELEMENT_DATA = sortBy(x, 'time').reverse();
        this.dataSource = new MatTableDataSource<PeriodicElement>(
          this.ELEMENT_DATA
        );
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public goToDetails(index: number, measurement: any): void {
    this.store.selectedMeasurement = measurement;
    this.router.navigate([`../pomiar/${index}`], { relativeTo: this.route });
  }

  public timeToDate(time: string): string {
    return moment(+time).format('DD.MM.YYYY');
  }
}
