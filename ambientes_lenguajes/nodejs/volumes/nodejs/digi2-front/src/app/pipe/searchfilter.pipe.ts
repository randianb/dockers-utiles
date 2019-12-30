import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "searchfilter",
})
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        return items.filter(it => {
            if (!value) {
                return true;
            }

            let text: string = it[field];
            text = text.toLowerCase();
            value = value.toLowerCase();
            if (text.indexOf(value) != -1) {
                return true;
            }
            return false;
        });
    }
}
