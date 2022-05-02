import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  segmentValue = '1';
  item: any;
  trips = [] ;
  currentImage: string;

  constructor(private dataService: DataService,
    public navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataService.getTrips().subscribe(data => {
      this.trips = data ;
      const id = this.route.snapshot.paramMap.get('id');
      // console.log('check id: ', id);
      if(!id) {
        this.navCtrl.back();
        return;
      }
      this.item = this.trips.find(x => x.id == parseInt(id));
      this.currentImage = this.item.images[0];
    }, error => { console.log(error) }) ;
  }

  segmentChanged(event) {
    // console.log(event);
    this.segmentValue = event.detail.value;
  }

  changeImage(image) {
    this.currentImage = image;
  }

}
