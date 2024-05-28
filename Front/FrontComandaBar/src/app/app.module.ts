import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './Components/card/card.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAwesomePopupModule, DialogConfigModule, ConfirmBoxConfigModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAwesomePopupModule,
    DialogConfigModule,
    ConfirmBoxConfigModule,
    ToastNotificationConfigModule,
    NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot(), 
    ConfirmBoxConfigModule.forRoot(), 
    ToastNotificationConfigModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
