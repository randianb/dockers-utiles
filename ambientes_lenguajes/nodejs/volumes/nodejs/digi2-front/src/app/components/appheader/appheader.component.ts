import { Component, OnInit } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { UserData } from "../../models/userdata";

@Component({
    selector: "app-header",
    templateUrl: "./appheader.component.html",
    styleUrls: ["./appheader.component.scss"]
})
export class AppHeaderComponent implements OnInit {
    public isCollapsed: boolean = true;
    public user: UserData;

    constructor(private AuthService: AuthService) {
        this.AuthService.getUserToken().subscribe((userData: UserData) => this.user = userData);
    }

    ngOnInit() {
    }

    toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
    }
}
