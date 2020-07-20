import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Currency } from 'src/model/currency';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {  
  message: string = '';
  currentCurrency: Currency = {};
  defaultCurrencySymbol: string = '';

  constructor(private _translateService: TranslateService, public globals: Globals) {
    this.globals.currencySymbols = ['BRL', 'USD', 'EUR', 'BTC'];
    _translateService.setDefaultLang('pt');
    this.currentCurrency.symbol = 'BRL';
    this.currentCurrency.value = 10000;
    this.globals.currentCurrency = this.currentCurrency;
    this.setDefaultCurrency();
  }

  useLanguage(language: string): void {
    if (language == 'us'){
      this.currentCurrency.symbol = 'USD';
      this._translateService.use('en');
    }
    else if (language == 'pt'){
      this.currentCurrency.symbol = 'BRL';
      this._translateService.use(language);
    }
    if (language == 'gb'){
      this.currentCurrency.symbol = 'EUR';
      this._translateService.use('en');
    }    
    this.defaultCurrencySymbol = this.currentCurrency.symbol;
    this.setDefaultCurrency();
  }

  setDefaultCurrency() {
    this.globals.defaultCurrency.symbol = this.currentCurrency.symbol;
    this.globals.defaultCurrency.value = this.currentCurrency.value;
  }

  receiveMessage($event): void {
    if ($event)
      this.message = $event;
  }
}
