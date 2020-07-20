import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false
})

export class LocalizedDatePipe implements PipeTransform {
  constructor(private _translate: TranslateService) {}

  transform(value: any): any {
    const datePipe: DatePipe = new DatePipe(this._translate.currentLang ?? this._translate.defaultLang);
    return datePipe.transform(value, 'medium');
  }
}