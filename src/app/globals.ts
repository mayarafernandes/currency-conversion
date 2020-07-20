import { Injectable } from '@angular/core';
import { Currency } from '../model/currency'

@Injectable()
export class Globals {
    currencySymbols: string[] = ['BRL', 'USD', 'EUR', 'BTC'];
    currentCurrency: Currency = { };
}