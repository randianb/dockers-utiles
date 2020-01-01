import { FileType } from './../../../models/filetype';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";

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

@Component({
    selector: "seriesdocumentales-storage",
    templateUrl: "./storage.component.html",
})
export class SeriesDocumentalesStorageComponent implements OnInit {
    list: SerieDocumental[];
    statesList: State[];
    applicationsList: Application[];
    documentTypesList: DocumentType[];
    stateOptions: SelectOption[];
    timeOptions: SelectOption[];
    searchForm: FormGroup;
    editForm: FormGroup;
    showEditor: boolean;
    validatePath: boolean;
    fileTypesList: FileType[];

    constructor(private eventsHubService: EventsHubService, private loadingService: LoadingService, private formBuilder: FormBuilder,
        private seriesDocumentalesService: SeriesDocumentalesService, private openSnackBarService: OpenSnackBarService) {

        this.stateOptions = this.seriesDocumentalesService.stateOptions;
        this.timeOptions = this.seriesDocumentalesService.timeOptions;
        this.showEditor = false;
        this.validatePath = true;

        this.searchForm = this.formBuilder.group({
            search: [""],
            state: [true, Validators.required],
        });
    }

    ngOnInit() {
        this.eventsHubService.setSeriesDocumentalesMenu("storage");

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
                this.validatePath = false;

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
                    pathStorage: [{ value: response.result.pathGuardado, disabled: !response.result.activo}, [Validators.required],
                        this.validatorCheckPathValid.bind(this)],
                });

                this.showEditor = true;
                setTimeout(() => this.validatePath = true);     // Avoid checking the path until everything is set

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

        const serieDocumentalId = this.editForm.value.idSerieDocumental;
        const pathStorage = this.editForm.value.pathStorage;
        this.seriesDocumentalesService.updateSerieDocumentalStoragePath(serieDocumentalId, pathStorage).subscribe(
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
            (error: any) => {
                this.openSnackBarService.openAlert(error.error.msg, "error");
                this.loadingService.hide("main");
            },
        );
    }
    editItemCancel(): void {
        this.showEditor = false;
    }

    validatorCheckPathValid(control: AbstractControl): Observable<ValidationErrors> {
        if (!this.validatePath) {
            let ret = new Subject<ValidationErrors>();
            setTimeout(() => {
                ret.next(null);
                ret.complete();
            });
            return ret.asObservable();
        }

        let regExp = new RegExp("(^(\/)(([A-Za-z_\-\s0-9\.\/])+))$");
        if (!regExp.test(control.value)) {
            let ret = new Subject<ValidationErrors>();
            setTimeout(() => {
                ret.next({ invalidPath: true });
                ret.complete();
            });
            return ret.asObservable();
        }

        return Observable.timer(1000).switchMap(() => {
            return this.seriesDocumentalesService.checkFileStoragePathValid(control.value)
                .catch(err => {
                    return Observable.of<ServerResponse>(err.error);
                })
                .map((response: ServerResponse) => {
                    if (response.success) {
                        return null;
                    }
                    return { invalidPath: true };
                });
        });
    }
}
