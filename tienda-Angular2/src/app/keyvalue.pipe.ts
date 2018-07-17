import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue'
})
// Pipe para hacer for loops en el html template ciclando las llaves del objeto.
export class KeyvaluePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Object.keys(value);
  }

}
