import { AfterContentChecked, Component, OnInit } from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { EffectFade, SwiperOptions } from 'swiper';
import {DataService} from "../../../services/data.service";
import {CategoryModel} from "../../../models/category.model";
import {TripModel} from "../../../models/trip.model";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

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

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {

    this.dataService.getCategories().subscribe(data => {
      this.categories = data ;
    }, error => { console.log(error) }) ;

    this.dataService.getTrips().subscribe(data => {
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

}
