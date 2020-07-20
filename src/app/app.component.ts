import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {  
  message: string = '';

  constructor(private _translate: TranslateService, private _globals: Globals) {
    _translate.setDefaultLang('pt');
    _globals.currentCurrency.symbol = 'BRL';
    _globals.currentCurrency.value = 50000;
  }

  useLanguage(language: string) {
    if (language == 'us'){
      this._globals.currentCurrency.symbol = 'USD';
      this._translate.use('en');
    }
    else if (language == 'pt'){
      this._globals.currentCurrency.symbol = 'BRL';
      this._translate.use(language);
    }
    if (language == 'gb'){
      this._globals.currentCurrency.symbol = 'EUR';
      this._translate.use('en');
    }
  }

  receiveMessage($event) {
    if ($event)
      this.message = `${this.message}\n${$event}`;
  }
}
