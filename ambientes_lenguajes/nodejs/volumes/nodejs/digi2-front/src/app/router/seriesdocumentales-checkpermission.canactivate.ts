import { Injectable } from "@angular/core"
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { AuthService } from "../services/auth.service";
import { UserData } from "../models/userdata";

@Injectable()
export class SeriesDocumentalesCheckPermission implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let ret = new Subject<boolean>();

        setTimeout(() => {
            this.authService.getUserToken().subscribe((userData: UserData) => {
                if (userData) {
                    if (route.url[0].path == "security") {
                        if (this.authService.isSeriesDocumentalesSecurityEnable()) {
                            ret.next(true);
                            ret.complete();
                            return;
                        }
                    }
                    else if (route.url[0].path == "storage") {
                        if (this.authService.isSeriesDocumentalesStorageEnable()) {
                            ret.next(true);
                            ret.complete();
                            return;
                        }
                    }
                    else if (route.url[0].path == "filemanager") {
                        if (this.authService.isSeriesDocumentalesFileManagerEnable()) {
                            ret.next(true);
                            ret.complete();
                            return;
                        }
                    }
                    else {
                        ret.next(true);
                        ret.complete();
                        return;
                    }

                    this.router.navigate(["seriesdocumentales", "home"]);
                    ret.next(false);
                    ret.complete();
                    return;
                }
            });
        });

        return ret;
    }
}
