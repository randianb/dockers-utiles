import { Component, OnInit } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { LoadingService } from "../../components/loading/loading.service";
import { UserData } from "../../models/userdata";

@Component({
    selector: "seriesdocumentales",
    templateUrl: "./seriesdocumentales.component.html",
})
export class SeriesDocumentalesComponent implements OnInit {
    initialized: boolean;

    constructor(private authService: AuthService, private loadingService: LoadingService) {
        loadingService.show("main");

        this.initialized = false;
        this.authService.getUserToken().subscribe((userData: UserData) => {
            if (userData != null) {
                this.initialized = true;
                loadingService.hide("main");
            }
        });
    }

    ngOnInit() {
    }

    onActivate(e, scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}
