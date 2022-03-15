import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeasurementsService } from "./measurements.service";
import { measurementsActions } from './index';
import { catchError, exhaustMap, map, of, tap } from "rxjs";

@Injectable() export class MeasurementsEffects {
    getData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(measurementsActions.getMeasurementsActions.send),
            exhaustMap(() => this.service.getData().pipe(
                map((res) => measurementsActions.getMeasurementsActions.success({ res })),
                catchError((error) => of(measurementsActions.getMeasurementsActions.fail({ error })))
            ))
        ));

    constructor(private actions$: Actions, private service: MeasurementsService) { }
}