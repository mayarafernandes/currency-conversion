import { Component, OnInit } from '@angular/core';
import { Conversion } from 'src/model/conversion';
import { ConversionService } from '../service/conversion.service'
import { Globals } from '../globals';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html'
})
export class ConversionComponent implements OnInit {
  
  conversion: Conversion = new Conversion();

  constructor(private conversionService: ConversionService, public globals: Globals) { }

  ngOnInit(): void {        
    this.conversion = {
      fromCurrency: { symbol: this.globals.currentCurrency.symbol, value: this.globals.currentCurrency.value },
      toCurrency: { }
    }
  }

  async onConvet(): Promise<void> {
    if (isNaN(this.conversion.fromCurrency.value))
      return;
    this.conversion.toCurrency.value = null;
    await this.conversionService.convert(this.conversion);
  }
}
