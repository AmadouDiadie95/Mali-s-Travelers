import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryModel} from "../models/category.model";
import {TripModel} from "../models/trip.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore) { }

  getCategories(): Observable<Array<CategoryModel>> {
    return this.httpClient.get<CategoryModel[]>('assets/data/categories.json') ;
  }

  getTrips(): Observable<Array<TripModel>> {
    return this.httpClient.get<TripModel[]>('assets/data/trips.json') ;
  }

  getFirebaseTrips(): Observable<any> {
    return this.firestore.collection('trips').valueChanges() ;
  }

}
