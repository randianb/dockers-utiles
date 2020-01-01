import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { AppSettingsService } from "./appsettings.service";
import { ServerResponseUserRoles, ServerResponseRxfMatrix } from "../models/serverresponse";
import { UserData } from "../models/userdata";

@Injectable()
export class AuthService {
    private userDataSubject: BehaviorSubject<UserData>;
    private userData: UserData;

    constructor(private httpClient: HttpClient) {
        this.userDataSubject = new BehaviorSubject<UserData>(null);
        this.updateUserData();
    }

    private updateUserData(): void {
        this.userData = null;
        this.httpClient.get<ServerResponseUserRoles>(AppSettingsService.API_BASE + "/security/user/get_roles")
            .subscribe(
                (responseUserRoles: ServerResponseUserRoles) => {
                    this.httpClient.get<any>(AppSettingsService.API_BASE + "/security/rxf/matrix")
                        .subscribe(
                            (responseRxfMatrix: ServerResponseRxfMatrix) => {
                                this.userData = {
                                    ...responseUserRoles.data,
                                    "matrix": responseRxfMatrix.result,
                                };
                                this.userDataSubject.next(this.userData);
                            },
                        );
                },
            );
    }

    getUserToken(): Observable<UserData> {
        return this.userDataSubject.asObservable();
    }

    getRoles(): Observable<ServerResponseRxfMatrix> {
        return this.httpClient.get<ServerResponseRxfMatrix>(AppSettingsService.API_BASE + "/security/rxf/matrix");
    }

    isSeriesDocumentalesSecurityEnable(): boolean {
        if (this.userData == null) {
            return false;
        }
        // TODO: Check if it is enable
        return true;
    }

    isSeriesDocumentalesStorageEnable(): boolean {
        if (this.userData == null) {
            return false;
        }
        // TODO: Check if it is enable
        return true;
    }

    isSeriesDocumentalesFileManagerEnable(): boolean {
        if (this.userData == null) {
            return false;
        }
        // TODO: Check if it is enable
        return true;
    }
}
