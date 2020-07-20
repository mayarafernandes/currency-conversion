import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators/'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Conversion } from 'src/model/conversion';
import { Currency } from 'src/model/currency';
import { Globals } from '../globals'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ConversionService {      

  message: any;
  currencies: Currency[];

  constructor(private http: HttpClient, private globals: Globals) { }

  async getCurrencies(): Promise<Currency[]> {
    this.currencies = []
    for (let currencySymbol of this.globals.currencySymbols) {
      if (currencySymbol == this.globals.currentCurrency.symbol)
        continue
      let conversionSymbols: string = this.getConversionSymbols(this.globals.currentCurrency.symbol, currencySymbol);
      let apiUrl: string = this.getApiUrl(conversionSymbols);
      await this.http.get<any>(apiUrl, httpOptions).pipe( catchError(this.handleError<Currency[]>([])) )
      .toPromise()
      .then(response => {      
          if (response.hasOwnProperty(conversionSymbols) && !isNaN(response[conversionSymbols]))
            this.currencies.push({ symbol: currencySymbol, value: Number(response[conversionSymbols])})
      });
    }    
    return this.currencies;
  }

  async convert(conversion: Conversion): Promise<string>  {    
    let conversionSymbols: string = `${conversion.fromCurrency.symbol}_${conversion.toCurrency.symbol}`;
    let apiUrl = this.getApiUrl(conversionSymbols)
    await this.http.get<any>(apiUrl, httpOptions)
      .pipe( catchError(this.handleError()))
      .toPromise().then(response => {      
      if (response.hasOwnProperty(conversionSymbols) && !isNaN(response[conversionSymbols]))
        conversion.toCurrency.value = (Number(response[conversionSymbols]) * conversion.fromCurrency.value);
      });
    return this.message;
  }

  private getConversionSymbols(fromSymbol: string, toSymbol: string): string {
    return `${fromSymbol}_${toSymbol}`;
  }

  private getApiUrl(conversionSymbols: string): string{    
    return `https://free.currconv.com/api/v7/convert?q=${conversionSymbols}&compact=ultra&apiKey=3f06abaa03d8913b3fbc`;
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.message = error.message;
      return of(result as T);
    };
  }
}