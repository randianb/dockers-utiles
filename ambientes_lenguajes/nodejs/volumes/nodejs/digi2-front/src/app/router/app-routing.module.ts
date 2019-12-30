import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SeriesDocumentalesCheckPermission } from "./seriesdocumentales-checkpermission.canactivate";

import { SeriesDocumentalesComponent } from "../pages/seriesdocumentales/seriesdocumentales.component";
import { SeriesDocumentalesHomeComponent } from "../pages/seriesdocumentales/home/home.component";
import { SeriesDocumentalesSecurityComponent } from "../pages/seriesdocumentales/security/security.component";
import { SeriesDocumentalesStorageComponent } from "../pages/seriesdocumentales/storage/storage.component";
import { SeriesDocumentalesFileManagerComponent } from "../pages/seriesdocumentales/filemanager/filemanager.component";
import { SeriesDocumentalesApplicationsComponent } from "../pages/seriesdocumentales/applications/applications.component";
import { SeriesDocumentalesStatesComponent } from "../pages/seriesdocumentales/states/states.component";
// import { SeriesDocumentalesDocumentTypesComponent } from "../pages/seriesdocumentales/documenttypes/documenttypes.component";
import { SeriesDocumentalesFileTypesComponent } from "../pages/seriesdocumentales/filetypes/filetypes.component";
import { SeriesDocumentalesReportsComponent } from "../pages/seriesdocumentales/reports/reports.component";
import { Error500Component } from "../pages/error500/error500.component";
import { NotFoundComponent } from "../pages/notfound/notfound.component";

const routes: Routes = [
    { path: "seriesdocumentales", component: SeriesDocumentalesComponent,
        children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: SeriesDocumentalesHomeComponent },
            { path: "security", component: SeriesDocumentalesSecurityComponent, canActivate: [ SeriesDocumentalesCheckPermission ] },
            { path: "storage", component: SeriesDocumentalesStorageComponent, canActivate: [ SeriesDocumentalesCheckPermission ] },
            { path: "filemanager", component: SeriesDocumentalesFileManagerComponent, canActivate: [ SeriesDocumentalesCheckPermission ] },
            { path: "applications", component: SeriesDocumentalesApplicationsComponent },
            { path: "states", component: SeriesDocumentalesStatesComponent },
            // { path: "documenttypes", component: SeriesDocumentalesDocumentTypesComponent },
            { path: "filetypes", component: SeriesDocumentalesFileTypesComponent },
            { path: "reports", component: SeriesDocumentalesReportsComponent },
            { path: "error500", component: Error500Component },
            { path: "**", component: NotFoundComponent }
        ],
    },
    { path: "", redirectTo: "seriesdocumentales", pathMatch: "full" },
    { path: "error500", component: Error500Component },
    { path: "**", component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        SeriesDocumentalesCheckPermission,
    ],
})
export class AppRoutingModule {
}
