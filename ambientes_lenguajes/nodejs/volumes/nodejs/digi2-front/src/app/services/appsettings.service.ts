import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class AppSettingsService {
    private settings: any = {};

    // public static API_ALFRESCAS = "http://alfrescas.cipres.io:8080/digi2";
    // public static API_ALFRESCAS: string = environment.production ? "/digi2" : "http://alfrescas.cipres.io:8080/digi2";
    public static API_ALFRESCAS: string = environment.production ? "/digi2" : "http://localhost:8080";
    public static API_BASE: string = environment.production ? "" : "/api";

    constructor(private httpClient: HttpClient) {
    }

    public get(key: string) {
        if (this.settings.hasOwnProperty(key)) return this.settings[key];
        return null;
    }

    public set(settings: any) {
        this.settings = { ...this.settings, settings };
    }

    // getConfig(): void {
    //     this.httpClient.get(AppSettingsService.API_BASE + "/config/as_array", { withCredentials: true })
    //         .subscribe(
    //             (response: any) => {
    //                 console.log("ACA1:", response);
    //             },
    //             error => {
    //                 console.log("Error:", error);
    //             }
    //         );
    //         /*
    //         .toPromise()
    //         .then(settings => {
    //             console.log(`Settings from API: `, settings);
    //             this.settings.set(settings);
    //             return this.getRoles();
    //         })
    //         .catch(err => {
    //             console.error("Error en getConfig: ", err);
    //             if (this.CookieService.get("security_token")) {
    //                 return this.router.navigate(["error500"]);
    //             }
    //             return this.httpClient.post(`${API_ENDPOINT_URL}/security/token/create`, {}, { withCredentials: true })
    //                 .toPromise()
    //                 .then((res: any) => {
    //                     console.log("Response: ", res);
    //                     this.CookieService.put("security_token", res.result.token);
    //                     console.log("Cookie: ", this.CookieService.get("security_token"));
    //                     return this.getConfig();
    //                 })
    //                 .catch((r) => this.router.navigate(["error500"]));
    //         });
    //         */
    // }
}
