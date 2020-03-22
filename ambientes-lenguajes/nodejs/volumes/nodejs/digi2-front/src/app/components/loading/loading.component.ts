import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})

export class LoadingComponent implements OnInit {
    @Input("name") name: string;
    dialog: boolean;

    constructor(private loadingService: LoadingService) {
        this.name = "";
    }

    ngOnInit() {
        if (!this.name) {
            throw new Error("Loading requires a name, please provide it.");
        }
        this.loadingService.register(this.name)
    }

    ngOnDestroy() {
        this.loadingService.unregister(this.name);
    }

    get isLoading() {
        if (!this.name) {
            return false;
        }
        return this.loadingService.isLoading(this.name);
    }
}
