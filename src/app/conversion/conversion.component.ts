import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Conversion } from 'src/model/conversion';
import { ConversionService } from '../service/conversion.service'
import { Globals } from '../globals';
import { Currency } from 'src/model/currency';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html'
})
export class ConversionComponent {
  
  @Input() currentCurrency: Currency;
  @Output() messageEvent = new EventEmitter<string>();
  conversion: Conversion;  

  constructor(private _conversionService: ConversionService, public globals: Globals) {
    this.conversion = new Conversion()
    this.conversion.fromCurrency = {}
    this.conversion.toCurrency = {}
  }

  async onConvet(): Promise<void> {
    if (!this.currentCurrency || !this.conversion.toCurrency.symbol ||isNaN(this.currentCurrency.value))
      return;
    this.conversion.fromCurrency.symbol = this.currentCurrency.symbol;
    this.conversion.fromCurrency.value = this.currentCurrency.value;
    this.conversion.toCurrency.value = null;
    await this._conversionService.convert(this.conversion).then(res => {
      if (res.message)
        this.messageEvent.emit(res.message);
    });
  }
}
