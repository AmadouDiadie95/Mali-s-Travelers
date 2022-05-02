import { AfterContentChecked, Component, OnInit } from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { EffectFade, SwiperOptions } from 'swiper';
import {DataService} from "../../../services/data.service";
import {CategoryModel} from "../../../models/category.model";
import {TripModel} from "../../../models/trip.model";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AppDataState, DataStateEnum} from "../../../state/state";
import {catchError, map, startWith} from "rxjs/operators";

// install Swiper modules
SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  config: SwiperOptions;
  config1: SwiperOptions;
  categories: CategoryModel[] = [];
  trips: TripModel[] = [];
  searchKey: string ;
  items$: Observable<any> | null = null ;
  DataStateEnum=DataStateEnum;

  constructor(private dataService: DataService, private router: Router,
              private firestore: AngularFirestore) {

  }

  ngOnInit() {

    this.dataService.getCategories().subscribe(data => {
      this.categories = data ;
    }, error => { console.log(error) }) ;

    this.items$ =
      this.dataService.getFirebaseTrips().pipe(
        map(data=>{
          console.log(data);
          if (data.length != 0) {
            this.trips = data ;
            return ({dataState:DataStateEnum.LOADED,data:data})
          } else {
            this.getLocalTrips() ;
            return ({dataState:DataStateEnum.ERROR,errorMessage:'( Veuillez vous Connectez pour Mettre a Jour ! )'})
          }
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:'( Veuillez vous Connectez pour Mettre a Jour ! )'}, this.getLocalTrips()))
      ) ;

  }

  getLocalTrips() {
    console.log("Error on Online loading, taking local data") ;
    this.dataService.getTrips().subscribe(data => {
      // console.log(data) ;
      this.trips = data ;
    }, error => { console.log(error) }) ;
  }

  ngAfterContentChecked() {
    this.config = {
      slidesPerView: 2.1
    };
    this.config1 = {
      slidesPerView: 2
    };
  }

  showCategoryTrips(name: string) {
    // console.log(name) ;
    this.router.navigateByUrl('tabs/search/' + name);
  }

  searchTip(){
    this.router.navigateByUrl('tabs/search/searchKey-' + this.searchKey);
  }

  addTripsFirebase() {
    this.dataService.getTrips().subscribe(data => {
      console.log(data) ;
      this.trips = data ;
      this.trips.forEach(trip => {
        this.firestore.collection('trips').add(trip) ;
      }) ;
    }, error => { console.log(error) }) ;

  }

}
