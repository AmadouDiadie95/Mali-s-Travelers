import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild('tabs', {static: false}) tabs: IonTabs;
  selectedTab: any;

  constructor(public router: Router) { }

  ngOnInit() {
  }
  

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    // console.log(this.selectedTab);
  }
}
