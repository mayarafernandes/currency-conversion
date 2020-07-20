import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/model/currency';
import { Conversion } from 'src/model/conversion';
import { ConversionService } from '../service/conversion.service';
import { Globals } from '../globals'
import { Observable, interval, of, timer } from 'rxjs';
import { startWith, switchMap, retry, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html'
})
export class CurrenciesComponent implements OnInit {
  
  currencies: Currency[];  
  lastUpdate: Date;

  @Output() messageEvent = new EventEmitter<string>()

  constructor(private conversionService: ConversionService, public globals: Globals) { }

  async ngOnInit(): Promise<void> {
    this.currencies = [
        {symbol: 'BRL', value: 49682.96},
        {symbol: 'USD', value: 9882.96},
        {symbol: 'EUR', value: 758.96},
      ]
    //await this.conversionService.getCurrencies().then(res => this.currencies = res);
    this.lastUpdate = new Date();

    // interval(5000)
    //   .pipe<number, Currency[]>(
    //     startWith(0),
    //     switchMap<number, Currency[]>(() => this.conversionService.getCurrencies())
    //   )
    //   .subscribe(res => this.currencies = res)
  }
}
