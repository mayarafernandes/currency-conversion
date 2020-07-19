import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { ConversionComponent } from './conversion/conversion.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    ConversionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
