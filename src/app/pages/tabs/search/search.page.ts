import { Component, OnInit } from '@angular/core';
import {TripModel} from "../../../models/trip.model";
import {DataService} from "../../../services/data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-location',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  allTrips: TripModel[] = [];
  trips: TripModel[] = [];
  searchKey: string ;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getTrips().subscribe(data => {
      this.allTrips = data ;
      if ( this.route.snapshot.paramMap.get('categoryName') == 'all' ) {
        this.trips = this.allTrips ;

      } else if (this.route.snapshot.paramMap.get('categoryName').includes('searchKey')) {
        this.searchKey = this.route.snapshot.paramMap.get('categoryName').split('-')[1] ;
        this.searchTip() ;
      } else {
        this.getCategoryTripToShow(this.route.snapshot.paramMap.get('categoryName')) ;
      };
    }, error => { console.log(error) }) ;
  }

  getCategoryTripToShow(categoryName: string){
    this.trips = [] ;
    this.allTrips.forEach(trip => {
      if (trip.category == categoryName) {
        this.trips.push(trip) ;
      }
    }) ;
  }

  searchTip(){
    console.log(this.searchKey) ;
    this.trips = [] ;
    this.allTrips.forEach(trip => {
      if (trip.name.includes(this.searchKey) || trip.description.includes(this.searchKey)) {
        this.trips.push(trip) ;
      }
    }) ;
  }

}
