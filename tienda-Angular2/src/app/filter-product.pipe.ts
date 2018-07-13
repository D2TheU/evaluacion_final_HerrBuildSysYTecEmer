import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(items: any, args?: any): any {
    console.log(args);
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
          console.log(product);
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
    console.log(filteredArray);

    return filteredArray;
  }

}
