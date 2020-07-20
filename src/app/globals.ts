import { Injectable } from '@angular/core';
import { Currency } from '../model/currency'

@Injectable()
export class Globals {
    currencySymbols: string[] = [];
    currentCurrency: Currency = { };
    defaultCurrency: Currency = { };
}