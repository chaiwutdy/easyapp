import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgProgressModule } from '@ngx-progressbar/core';

import { AppRoutingModule } from './app-routing.module';
import { NdcserviceService } from './services/ndcservice.service';
import { PagerService } from './ndcreceived/PagerService';

import { AppComponent } from './app.component';
import { NdcreceivedComponent } from './ndcreceived/ndcreceived.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    NdcreceivedComponent,
    HomeComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    NgProgressModule.forRoot(),
    AppRoutingModule
  ],
  providers: [NdcserviceService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
