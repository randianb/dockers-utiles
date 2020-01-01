import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EventsHubService {
    private seriesDocumentalesMenuSubject: Subject<string>;

    constructor() {
        this.seriesDocumentalesMenuSubject = new Subject<string>();
    }

    setSeriesDocumentalesMenu(menu: string): void {
        this.seriesDocumentalesMenuSubject.next(menu);
    }
    onSeriesDocumentalesMenuChanged(): Observable<string> {
        return this.seriesDocumentalesMenuSubject.asObservable();
    }
}
