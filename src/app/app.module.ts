import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from "./app.component";
import {RouterModule, Routes} from '@angular/router';
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../environments/fcm";

const appRoutes: Routes = [
  {path: '', component: AppComponent}
]
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
