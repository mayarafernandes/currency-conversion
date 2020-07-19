import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators/'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Conversion } from 'src/model/conversion';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ConversionService {      

  message: any;

  constructor(private http: HttpClient) { }

  async convert(conversion: Conversion): Promise<string>  {    
    let conversionSymbols: string = `${conversion.fromCurrency.symbol}_${conversion.toCurrency.symbol}`;
    let apiUrl = `https://free.currconv.com/api/v7/convert?q=${conversionSymbols}&compact=ultra&apiKey=3f06abaa03d8913b3fbc`;
    await this.http.get<any>(apiUrl, httpOptions)
      .pipe( catchError(this.handleError()))
      .toPromise().then(response => {      
      if (response.hasOwnProperty(conversionSymbols) && !isNaN(response[conversionSymbols]))
        conversion.toCurrency.value = (Number(response[conversionSymbols]) * conversion.fromCurrency.value);
      });
    return this.message;
  }

  private handleError() {
    return (error: any): Observable<any> => {
      console.log(error);
      this.message = error.message;
      return of({});
    };
  }
}