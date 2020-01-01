import { FileType } from './../../../models/filetype';
import { ServerResponseFilesTypes } from './../../../models/serverresponse';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { EventsHubService } from "../../../services/eventshub.services";
import { SeriesDocumentalesService } from "../../../services/seriesdocumentales.service";
import { OpenSnackBarService } from "../../../services/opensnackbar.service";
import { ServerResponse, ServerResponseSeriesDocumentales, ServerResponseStates, ServerResponseDocumentsTypes,
    ServerResponseSerieDocumental } from "../../../models/serverresponse";
import { SerieDocumental } from "../../../models/seriedocumental";
import { DocumentType } from "../../../models/documenttype";
import { State } from "../../../models/state";
import { Application } from "../../../models/application";
import { SelectOption } from "../../../models/selectoption";
import { LoadingService } from "../../../components/loading/loading.service";

@Component({
    selector: "seriesdocumentales-home",
    templateUrl: "./home.component.html",
})
export class SeriesDocumentalesHomeComponent implements OnInit {
    list: SerieDocumental[];
    statesList: State[];
    applicationsList: Application[];
    // documentTypesList: DocumentType[];
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
        this.eventsHubService.setSeriesDocumentalesMenu("home");

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

    newItem(): void {
        let serieDocumental = {
            idSerieDocumental: null,
            estados: [],
            nombreSerieDocumental: null,
            descripcionSerieDocumental: null,
            aplicacionesPermitidas: [],
            confidencial: false,
            tiposArchivo: null,
            requiereFirmaDigital: false,
            mesesGuarda: null,
            activo: true,
            gruposAD: [],
            pathGuardado: null,
        }
        this.editForm = this.formBuilder.group({
            idSerieDocumental: [{ value: serieDocumental.idSerieDocumental, disabled: !serieDocumental.activo}],
            nombreSerieDocumental: [{ value: serieDocumental.nombreSerieDocumental, disabled: !serieDocumental.activo}, Validators.required],
            descripcionSerieDocumental: [{ value: serieDocumental.descripcionSerieDocumental, disabled: !serieDocumental.activo}, Validators.required],
            aplicacionesPermitidas: [{ value: serieDocumental.aplicacionesPermitidas, disabled: !serieDocumental.activo}, Validators.required],
            estados: [{ value: serieDocumental.estados, disabled: !serieDocumental.activo}, Validators.required],
            tiposArchivo: [{ value: serieDocumental.tiposArchivo, disabled: !serieDocumental.activo}, Validators.required],
            requiereFirmaDigital: [{ value: serieDocumental.requiereFirmaDigital, disabled: !serieDocumental.activo}, Validators.required],
            mesesGuarda: [{ value: serieDocumental.mesesGuarda, disabled: !serieDocumental.activo}, Validators.required],
            confidencial: [{ value: serieDocumental.confidencial, disabled: !serieDocumental.activo}, Validators.required],
            activo: [{ value: serieDocumental.activo, disabled: !serieDocumental.activo}],
        });
        this.showEditor = true;
    }
    editItem(serieDocumental: SerieDocumental): void {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getSerieDocumental(serieDocumental.idSerieDocumental, this.searchForm.value.state).subscribe(
            (response: ServerResponseSerieDocumental) => {
                this.editForm = this.formBuilder.group({
                    idSerieDocumental: [{ value: response.result.idSerieDocumental, disabled: !response.result.activo}],
                    nombreSerieDocumental: [{ value: response.result.nombreSerieDocumental, disabled: !response.result.activo}, Validators.required],
                    descripcionSerieDocumental: [{ value: response.result.descripcionSerieDocumental, disabled: !response.result.activo}, Validators.required],
                    aplicacionesPermitidas: [{ value: response.result.aplicacionesPermitidas, disabled: !response.result.activo}, Validators.required],
                    estados: [{ value: response.result.estados, disabled: !response.result.activo}, Validators.required],
                    tiposArchivo: [{ value: serieDocumental.tiposArchivo, disabled: !serieDocumental.activo}, Validators.required],
                    requiereFirmaDigital: [{ value: serieDocumental.requiereFirmaDigital, disabled: !serieDocumental.activo}, Validators.required],        
                    mesesGuarda: [{ value: response.result.mesesGuarda, disabled: !response.result.activo}, Validators.required],
                    confidencial: [{ value: response.result.confidencial, disabled: !response.result.activo}, Validators.required],
                    activo: [{ value: response.result.activo, disabled: !response.result.activo}],
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

        if (this.editForm.value.idSerieDocumental) {
            this.seriesDocumentalesService.updateSerieDocumental(this.editForm.value).subscribe(
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
        else {
            this.seriesDocumentalesService.createSerieDocumental(this.editForm.value).subscribe(
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
    }
    editItemCancel(): void {
        this.showEditor = false;
    }

    deleteItem(): void {
        if (this.loadingService.isLoading("main")) {
            return;
        }
        this.loadingService.show("main");

        this.seriesDocumentalesService.deleteSerieDocumental(this.editForm.value.idSerieDocumental).subscribe(
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
    undeleteItem(): void {
        if (this.loadingService.isLoading("main")) {
            return;
        }
        this.loadingService.show("main");

        this.seriesDocumentalesService.undeleteSerieDocumental(this.editForm.value.idSerieDocumental).subscribe(
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
}
