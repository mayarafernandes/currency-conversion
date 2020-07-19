import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/model/currency';
import { Conversion } from 'src/model/conversion';
import { ConversionService } from '../service/conversion.service';
import { Globals } from '../globals'

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html'
})
export class CurrenciesComponent implements OnInit {
  
  currencies: Currency[] = [];
  lastUpdate: Date;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private conversionService: ConversionService, public globals: Globals) { }

  async ngOnInit(): Promise<void> {
    let conversion: Conversion = {
      fromCurrency: this.globals.currentCurrency,
      toCurrency: new Currency()
    }

    for (let currencySymbol of this.globals.currencySymbols) {
      if (currencySymbol == this.globals.currentCurrency.symbol)
        return;      
      conversion.toCurrency.symbol = currencySymbol;
      conversion.toCurrency.value = null;
      await this.conversionService.convert(conversion).then(message => this.messageEvent.emit(message));
      this.currencies.push({ symbol: conversion.toCurrency.symbol, value: conversion.toCurrency.value});
      this.lastUpdate = new Date();
    }    
  }
}
