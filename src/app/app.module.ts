// Framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule }    from '@angular/common/http';
// i18n
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
// Local
import { AppComponent } from './app.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { ConversionComponent } from './conversion/conversion.component';
import { Globals } from './globals'
import { LocalizedCurrencyPipe } from './pipes/localized-currency.pipe'
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
// Material
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    ConversionComponent,
    LocalizedCurrencyPipe,
    LocalizedDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    MaterialModule
  ],
  providers: [
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localePt, 'pt');
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
