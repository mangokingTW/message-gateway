import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from "../environments/fcm";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {FirebaseApp, initializeApp} from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'af-notification';
  message: any = null;
  firebaseApp: any = null;

  constructor() {
  }

  ngOnInit(): void {
    navigator.serviceWorker.register("./firebase-messaging-sw.js")
    this.firebaseApp = initializeApp(firebaseConfig);
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging(this.firebaseApp);
    getToken(messaging,
      { vapidKey: firebaseConfig.vapidKey}).then(
      (currentToken) => {
        if (currentToken) {
          console.log("Hurraaa!!! we got the token.....");
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging(this.firebaseApp);
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}
