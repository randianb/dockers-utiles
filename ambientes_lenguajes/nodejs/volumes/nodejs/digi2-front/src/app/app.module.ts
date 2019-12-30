import { ReportesService } from './services/reportes.service';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { TagInputModule } from "ngx-chips";
import { CookieModule } from "ngx-cookie";

import { AppRoutingModule } from "./router/app-routing.module";
import { AppMaterialModule } from "./shared/material/material.module";

import { AppComponent } from "./app.component";
import { SeriesDocumentalesComponent } from "./pages/seriesdocumentales/seriesdocumentales.component";
import { SeriesDocumentalesHomeComponent } from "./pages/seriesdocumentales/home/home.component";
import { SeriesDocumentalesSecurityComponent } from "./pages/seriesdocumentales/security/security.component";
import { SeriesDocumentalesStorageComponent } from "./pages/seriesdocumentales/storage/storage.component";
import { SeriesDocumentalesFileManagerComponent } from "./pages/seriesdocumentales/filemanager/filemanager.component";
import { SeriesDocumentalesApplicationsComponent } from "./pages/seriesdocumentales/applications/applications.component";
import { SeriesDocumentalesStatesComponent } from "./pages/seriesdocumentales/states/states.component";
// import { SeriesDocumentalesDocumentTypesComponent } from "./pages/seriesdocumentales/documenttypes/documenttypes.component";
import { SeriesDocumentalesFileTypesComponent } from "./pages/seriesdocumentales/filetypes/filetypes.component";
import { SeriesDocumentalesReportsComponent } from "./pages/seriesdocumentales/reports/reports.component";
import { Error500Component } from "./pages/error500/error500.component";
import { NotFoundComponent } from "./pages/notfound/notfound.component";

import { AppMenuComponent } from "./components/appmenu/appmenu.component";
import { AppHeaderComponent } from "./components/appheader/appheader.component";
import { LoadingComponent } from "./components/loading/loading.component";

import { LoadingService } from "./components/loading/loading.service";
import { AppSettingsService } from "./services/appsettings.service";
import { AuthService } from "./services/auth.service";
import { EventsHubService } from "./services/eventshub.services";
import { SeriesDocumentalesService } from "./services/seriesdocumentales.service";
import { OpenSnackBarService } from "./services/opensnackbar.service";

import { SearchFilterPipe } from "./pipe/searchfilter.pipe";

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent,
        SeriesDocumentalesComponent,
        SeriesDocumentalesHomeComponent,
        SeriesDocumentalesSecurityComponent,
        SeriesDocumentalesStorageComponent,
        SeriesDocumentalesFileManagerComponent,
        SeriesDocumentalesApplicationsComponent,
        SeriesDocumentalesStatesComponent,
        // SeriesDocumentalesDocumentTypesComponent,
        SeriesDocumentalesFileTypesComponent,
        SeriesDocumentalesReportsComponent,
        Error500Component,
        NotFoundComponent,

        AppMenuComponent,
        AppHeaderComponent,
        LoadingComponent,

        SearchFilterPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
        TagInputModule,
        CookieModule.forRoot(),

        AppRoutingModule,
        AppMaterialModule,
    ],
    providers: [
        LoadingService,
        AppSettingsService,
        AuthService,
        EventsHubService,
        SeriesDocumentalesService,
        OpenSnackBarService,
        ReportesService,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}

