import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MeasurementsStore } from './measurements-store.service';

@Component({
  selector: 'app-measurment-history-details',
  templateUrl: './measurment-history-details.component.html',
  styleUrls: ['./measurment-history-details.component.scss'],
})
export class MeasurmenthistoryDetailsComponent implements OnInit {
  public mesurement: any = null;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private fbs: AngularFirestore,
    public store: MeasurementsStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    this.mesurement = this.store.selectedMeasurement;
    if (this.mesurement) {
      return;
    }
    const id = this.route.snapshot.params['id'];
    this.fbs
      .collection('measurements')
      .valueChanges()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((x) => {
        this.mesurement = x[id];
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public getDate(time: string): string {
    return moment(+time).format('DD.MM.YYYY');
  }

  public calculateSmoke(): string {
    return Number(this.mesurement?.meanSmoke) > 600
      ? ' zbyt wysoki !'
      : ' w normie';
  }

  public goBack(): void {
    this.router.navigate(['../../historia-pomiarów'], {
      relativeTo: this.route,
    });
  }
}
