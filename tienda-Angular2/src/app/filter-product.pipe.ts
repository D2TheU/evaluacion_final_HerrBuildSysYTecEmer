import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
// Pipe para filtrar los productos cuando se introdusca algo al campo filter.
export class FilterProductPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    let productArray = [];
    let filteredArray = [];

    for (let item in items) {
      let obj = {};
      obj[item] = items[item];
      productArray.push(obj);
    }

    let objCount = 0;
    let obj = {};
    for (let index in productArray) {
      for (var product in productArray[index]) {
        if (args == '' || product.indexOf(args) != -1) {
          obj[product] = productArray[index][product];
          objCount++;
          if (objCount == 4) {
            filteredArray.push(obj);
            obj = {};
            objCount = 0;
          }
        }
        if (parseInt(index) == productArray.length - 1 && objCount != 4) {
          filteredArray.push(obj);
        }
      }
    }

    return filteredArray;
  }

}
