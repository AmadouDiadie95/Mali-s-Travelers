import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";

// import { Camera } from '@ionic-native/camera/ngx';
// import { File } from '@ionic-native/file/ngx';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADKK3UaXGhrBEaXu7gz9KN6eYYbnEk2xE",
  authDomain: "mali-s-travelers.firebaseapp.com",
  projectId: "mali-s-travelers",
  storageBucket: "mali-s-travelers.appspot.com",
  messagingSenderId: "952228453423",
  appId: "1:952228453423:web:a885c2c4cdb147f55bfada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Camera
    // File
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
