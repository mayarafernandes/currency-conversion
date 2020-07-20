// Framework
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// i18n
import { TranslateService } from '@ngx-translate/core';
// Reactive
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators/'; 
// Locals
import { Conversion } from 'src/model/conversion';
import { Currency } from 'src/model/currency';
import { TransferObject } from 'src/model/transfer.object';
import { Globals } from '../globals'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ConversionService {      

  transferObject: TransferObject<any>;

  constructor(private _http: HttpClient, private _globals: Globals, private _translate: TranslateService) { }

  async getCurrencies(): Promise<TransferObject<Currency[]>> {
    this.transferObject = new TransferObject<Currency[]>();
    this.transferObject.data = []
    for (let currencySymbol of this._globals.currencySymbols) {
      if (currencySymbol == this._globals.defaultCurrency.symbol)
        continue
      let conversionSymbols: string = this.getConversionSymbols(this._globals.defaultCurrency.symbol, currencySymbol);
      let apiUrl: string = this.getApiUrl(conversionSymbols);
      await this._http.get<any>(apiUrl, httpOptions).pipe( catchError(this.handleError<any>({})) )
      .toPromise()
      .then(response => {      
          if (response.hasOwnProperty(conversionSymbols) && !isNaN(response[conversionSymbols]))
            this.transferObject.data.push({ 
              symbol: currencySymbol, 
              value: Number(response[conversionSymbols]) * this._globals.defaultCurrency.value
            })
      });
    }    
    return this.transferObject;
  }

  async convert(conversion: Conversion): Promise<TransferObject<any>>  {   
    this.transferObject = new TransferObject<any>(); 
    let conversionSymbols: string = `${conversion.fromCurrency.symbol}_${conversion.toCurrency.symbol}`;
    let apiUrl = this.getApiUrl(conversionSymbols)
    await this._http.get<any>(apiUrl, httpOptions)
      .pipe( catchError(this.handleError<any>({})))
      .toPromise().then(response => {      
      if (response.hasOwnProperty(conversionSymbols) && !isNaN(response[conversionSymbols]))
        conversion.toCurrency.value = (Number(response[conversionSymbols]) * conversion.fromCurrency.value);
      });
    return this.transferObject;
  }

  private getConversionSymbols(fromSymbol: string, toSymbol: string): string {
    return `${fromSymbol}_${toSymbol}`;
  }

  private getApiUrl(conversionSymbols: string): string{    
    return `https://free.currconv.com/api/v7/convert?q=${conversionSymbols}&compact=ultra&apiKey=3f06abaa03d8913b3fbc`;
  }

  private handleError<T>(defaultResult?: T) {
    return (error: any): Observable<T> => {
      if (error.name == "HttpErrorResponse")
        this._translate.get("errorExceededLimit").subscribe(res => this.transferObject.message = res);
      else
      this.transferObject.message = error.message;
      console.log(error);
      return of(defaultResult as T);
    };
  }
}