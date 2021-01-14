import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(items: { name: string, surname: string }[], searchStr: string, familia: string): any[] {
    if (searchStr === '' && familia === '') {
      return items;
    } else {
      let filteredItems = [];
      for(let i = 0; i < items.length; i++){
        if(items[i].name.toLowerCase().includes(searchStr.toLowerCase()) && items[i].surname.toLowerCase().includes(familia.toLowerCase())){ 
            filteredItems.push(items[i]);
        }
      }
      return filteredItems;
    }
  }
}
