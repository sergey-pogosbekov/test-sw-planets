import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPlanet } from './planet.dialog';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppComponent, DialogPlanet],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ DialogPlanet ]

})
export class AppModule {}
