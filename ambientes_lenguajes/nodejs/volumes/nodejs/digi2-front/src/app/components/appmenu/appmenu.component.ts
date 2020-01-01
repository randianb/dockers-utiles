import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../../services/auth.service";
import { EventsHubService } from "../../services/eventshub.services";
import { UserData } from "../../models/userdata";

@Component({
    selector: "app-menu",
    templateUrl: "./appmenu.component.html",
    styleUrls: ["./appmenu.component.scss"]
})
export class AppMenuComponent implements OnDestroy {
    private onMenuChanged: Subscription;
    activeMenu: string;
    securityEnable: boolean;
    storageEnable: boolean;
    fileManagerEnable: boolean;

    constructor(private authService: AuthService, private eventsHubService: EventsHubService) {
        this.securityEnable = false;
        this.storageEnable = false;
        this.fileManagerEnable = false;

        this.onMenuChanged = this.eventsHubService.onSeriesDocumentalesMenuChanged().subscribe(
            (menu: string) => this.activeMenu = menu
        );

        this.authService.getUserToken().subscribe((user: UserData) => {
            this.securityEnable = this.authService.isSeriesDocumentalesSecurityEnable();
            this.storageEnable = this.authService.isSeriesDocumentalesStorageEnable();
            this.fileManagerEnable = this.authService.isSeriesDocumentalesFileManagerEnable();
        });
    }

    ngOnDestroy(): void {
        this.onMenuChanged.unsubscribe();
    }
}
