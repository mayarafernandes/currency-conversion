import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/model/currency';
import { Conversion } from 'src/model/conversion';
import { ConversionService } from '../service/conversion.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html'
})
export class CurrenciesComponent implements OnInit {
  
  private _currencySymbols: string[] = ['BRL', 'USD', 'EUR', 'BTC'];

  currencies: Currency[] = [];
  currentCurrency: Currency = { symbol: 'BTC', value: 1 };

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private conversionService: ConversionService) { }

  async ngOnInit(): Promise<void> {
    let conversion: Conversion = {
      fromCurrency: this.currentCurrency,
      toCurrency: new Currency()
    }

    for (let currencySymbol of this._currencySymbols) {
      if (currencySymbol == this.currentCurrency.symbol)
        return;      
      conversion.toCurrency.symbol = currencySymbol;
      conversion.toCurrency.value = null;
      await this.conversionService.convert(conversion).then(message => this.messageEvent.emit(message));
      this.currencies.push({ symbol: conversion.toCurrency.symbol, value: conversion.toCurrency.value});
    }    
  }
}
