import { Component, OnInit } from '@angular/core';
import { Conversion } from '../../model/conversion';
import { ConversionService } from '../service/conversion.service'

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html'
})
export class ConversionComponent implements OnInit {
  
  conversion: Conversion = new Conversion();

  constructor(private conversionService: ConversionService) { }

  ngOnInit(): void {        
    this.conversion = {
      fromCurrency: { symbol: 'BTC', value: 10 },
      toCurrency: { symbol: 'BRL' }
    }
  }

  async onConvet(): Promise<void> {
    if (isNaN(this.conversion.fromCurrency.value))
      return;
    this.conversion.toCurrency.value = null;
    await this.conversionService.convert(this.conversion);
  }
}
