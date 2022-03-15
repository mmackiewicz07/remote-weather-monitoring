import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";



@Injectable()
export class MeasurementsService {
    constructor(private firestore: AngularFirestore, public db: AngularFireDatabase) { };
    item$!: Observable<any[]>;

    getData(): Observable<any> {
        const listRef: AngularFireList<any> = this.db.list('Photoresistor');
        return of(true);
    }
}