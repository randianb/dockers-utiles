import { FileType } from './../../../models/filetype';
import { Component, OnInit, AUTO_STYLE } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { TagModel } from "ngx-chips/core/accessor";
import "rxjs/add/operator/map";

import { EventsHubService } from "../../../services/eventshub.services";
import { SeriesDocumentalesService } from "../../../services/seriesdocumentales.service";
import { OpenSnackBarService } from "../../../services/opensnackbar.service";
import { ServerResponse, ServerResponseSeriesDocumentales, ServerResponseStates, ServerResponseDocumentsTypes, ServerResponseSerieDocumental } from "../../../models/serverresponse";
import { SerieDocumental } from "../../../models/seriedocumental";
import { DocumentType } from "../../../models/documenttype";
import { State } from "../../../models/state";
import { Application } from "../../../models/application";
import { SelectOption } from "../../../models/selectoption";
import { LoadingService } from "../../../components/loading/loading.service";
import { TagInputForm } from "ngx-chips";
import { TagInputOptions } from "ngx-chips/defaults";
import { TagDefinition, TagContentType } from "@angular/compiler";

@Component({
    selector: "seriesdocumentales-security",
    templateUrl: "./security.component.html",
})
export class SeriesDocumentalesSecurityComponent implements OnInit {
    list: SerieDocumental[];
    statesList: State[];
    applicationsList: Application[];
    documentTypesList: DocumentType[];
    stateOptions: SelectOption[];
    timeOptions: SelectOption[];
    searchForm: FormGroup;
    editForm: FormGroup;
    showEditor: boolean;
    fileTypesList: FileType[];

    constructor(private eventsHubService: EventsHubService, private loadingService: LoadingService, private formBuilder: FormBuilder,
        private seriesDocumentalesService: SeriesDocumentalesService,
        private openSnackBarService: OpenSnackBarService) {

        this.stateOptions = this.seriesDocumentalesService.stateOptions;
        this.timeOptions = this.seriesDocumentalesService.timeOptions;
        this.showEditor = false;

        this.searchForm = this.formBuilder.group({
            search: [""],
            state: [true, Validators.required],
        });
    }

    ngOnInit() {
        this.eventsHubService.setSeriesDocumentalesMenu("security");

        this.refreshList();
        this.getStates();
        this.getApplications();
        // this.getDocuentTypes();
        this.getFileTypes();
    }

    refreshList() {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getSeriesDocumentales(this.searchForm.value.state).subscribe(
            (response: ServerResponseSeriesDocumentales) => {
                if (response.success) {
                    this.list = response.result;
                }
                else {
                    this.openSnackBarService.openAlert(response.msg, "error");
                }
                this.loadingService.hide("main");
            },
            (error: HttpErrorResponse) => {
                this.openSnackBarService.openAlert(error.error.msg, "error");
                this.loadingService.hide("main");
            }
        );
    }

    private getStates() {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getStates(true).subscribe(
            (response: ServerResponseStates) => {
                if (response.success) {
                    this.statesList = response.result;
                }
                else {
                    this.openSnackBarService.openAlert(response.msg, "error");
                }
                this.loadingService.hide("main");
            },
            (error: HttpErrorResponse) => {
                this.openSnackBarService.openAlert(error.error.msg, "error");
                this.loadingService.hide("main");
            }
        );
    }

    private getApplications() {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getApplications(true).subscribe(
            (response: any) => {
                if (response.success) {
                    this.applicationsList = response.result;
                }
                else {
                    this.openSnackBarService.openAlert(response.msg, "error");
                }
                this.loadingService.hide("main");
            },
            (error: HttpErrorResponse) => {
                this.openSnackBarService.openAlert(error.error.msg, "error");
                this.loadingService.hide("main");
            }
        );
    }

    // private getDocuentTypes() {
    //     this.loadingService.show("main");

    //     this.seriesDocumentalesService.getDocumentsTypes(true).subscribe(
    //         (response: ServerResponseDocumentsTypes) => {
    //             if (response.success) {
    //                 this.documentTypesList = response.result;
    //             }
    //             else {
    //                 this.openSnackBarService.openAlert(response.msg, "error");
    //             }
    //             this.loadingService.hide("main");
    //         },
    //         (error: HttpErrorResponse) => {
    //             this.openSnackBarService.openAlert(error.error.msg, "error");
    //             this.loadingService.hide("main");
    //         }
    //     );
    // }

    private getFileTypes() {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getFilesTypes(true).subscribe(
            (response: any) => {
                if (response.success) {
                    this.fileTypesList = response.result;
                }
                else {
                    this.openSnackBarService.openAlert(response.msg, "error");
                }
                this.loadingService.hide("main");
            },
            (error: HttpErrorResponse) => {
                this.openSnackBarService.openAlert(error.error.msg, "error");
                this.loadingService.hide("main");
            }
        );
    }

    editItem(serieDocumental: SerieDocumental): void {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getSerieDocumental(serieDocumental.idSerieDocumental, this.searchForm.value.state).subscribe(
            (response: ServerResponseSerieDocumental) => {
                let gruposAD: any[] = response.result.gruposAD.map(item => {
                    let newItem = {
                        display: item,
                        value: item,
                    };
                    return newItem;
                });

                this.editForm = this.formBuilder.group({
                    idSerieDocumental: [response.result.idSerieDocumental],
                    nombreSerieDocumental: [{ value: response.result.nombreSerieDocumental, disabled: true}],
                    descripcionSerieDocumental: [{ value: response.result.descripcionSerieDocumental, disabled: true}],
                    // tipoDocumento: [{ value: response.result.tipoDocumento, disabled: true}],
                    aplicacionesPermitidas: [{ value: response.result.aplicacionesPermitidas, disabled: true}],
                    estados: [{ value: response.result.estados, disabled: true}],
                    tiposArchivo: [{ value: response.result.tiposArchivo, disabled: true}],
                    requiereFirmaDigital: [{ value: response.result.requiereFirmaDigital, disabled: true}],
                    mesesGuarda: [{ value: response.result.mesesGuarda, disabled: true}],
                    confidencial: [{ value: response.result.confidencial, disabled: true}],
                    activo: [response.result.activo],
                    gruposAD: [{ value: gruposAD, disabled: !response.result.activo}],
                });

                this.showEditor = true;
                this.loadingService.hide("main");
            },
            (error: HttpErrorResponse) => {
                this.openSnackBarService.openAlert(error.error.msg, "error");
                this.loadingService.hide("main");
            }
        );
    }
    editItemSave(): void {
        if (!this.editForm.valid) {
            this.openSnackBarService.openAlert("Complete el formulario", "error");
            return;
        }

        if (this.loadingService.isLoading("main")) {
            return;
        }
        this.loadingService.show("main");

        let gruposAD: string[] = this.editForm.value.gruposAD.map(item => item.value);
        this.seriesDocumentalesService.updateSerieDocumentalRoles(this.editForm.value.idSerieDocumental, gruposAD).subscribe(
            (response: ServerResponse) => {
                if (response.success) {
                    this.openSnackBarService.openAlert(response.msg, "success");
                    this.refreshList();
                    this.showEditor = false;
                }
                else {
                    this.openSnackBarService.openAlert(response.msg, "error");
                }
                this.loadingService.hide("main");
            },
            (error: HttpErrorResponse) => {
                this.openSnackBarService.openAlert(error.error.msg, "error");
                this.loadingService.hide("main");
            },
        );
    }
    editItemCancel(): void {
        this.showEditor = false;
    }

    requestAutocompleteItems = (text: string): Observable<any> => {
        return this.seriesDocumentalesService.getRoles(text).map(item => item.result);
    };
}
