import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedCurrency',
  pure: false
})

export class LocalizedCurrencyPipe implements PipeTransform {
  constructor(private _translate: TranslateService) {}

  transform(value: any, symbol: string): any {
    const currencyPipe: CurrencyPipe = new CurrencyPipe(this._translate.currentLang ?? this._translate.defaultLang);
    return currencyPipe.transform(value, symbol, 'symbol', '1.2-2');
  }
}