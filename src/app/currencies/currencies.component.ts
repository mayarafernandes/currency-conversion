import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Currency } from 'src/model/currency';
import { ConversionService } from '../service/conversion.service';
import { Globals } from '../globals'

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html'
})
export class CurrenciesComponent implements OnChanges {
  
  @Input() defaultCurrencySymbol: string;
  currencies: Currency[];
  lastUpdate: Date;  

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private _conversionService: ConversionService, public globals: Globals) {    
    setInterval(() => this.reloadCurrencies(), 15000);    
  }

  ngOnChanges(_: SimpleChanges): void {
    this.reloadCurrencies();
  }

  public reloadCurrencies(): void {
    this.currencies = []
    this._conversionService.getCurrencies().then(res => {
      if (res.message){
        this.messageEvent.emit(res.message);
      }
      else {
        this.currencies = res.data;
        this.lastUpdate = new Date();
      }  
    });    
  }
}
