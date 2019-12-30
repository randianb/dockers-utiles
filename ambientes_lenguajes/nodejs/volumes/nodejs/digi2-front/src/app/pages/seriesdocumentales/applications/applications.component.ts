import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { EventsHubService } from "../../../services/eventshub.services";
import { SeriesDocumentalesService } from "../../../services/seriesdocumentales.service";
import { OpenSnackBarService } from "../../../services/opensnackbar.service";
import { ServerResponse, ServerResponseApplication, ServerResponseApplications } from "../../../models/serverresponse";
import { Application } from "../../../models/application";
import { SelectOption } from "../../../models/selectoption";
import { LoadingService } from "../../../components/loading/loading.service";

@Component({
    selector: "seriesdocumentales-applications",
    templateUrl: "./applications.component.html",
})
export class SeriesDocumentalesApplicationsComponent implements OnInit {
    list: Application[];
    searchForm: FormGroup;
    editForm: FormGroup;
    stateOptions: SelectOption[];
    showEditor: boolean;

    constructor(private formBuilder: FormBuilder, private seriesDocumentalesService: SeriesDocumentalesService,
        private loadingService: LoadingService, private eventsHubService: EventsHubService, private openSnackBarService: OpenSnackBarService) {

        this.stateOptions = this.seriesDocumentalesService.stateOptions;
        this.showEditor = false;

        this.searchForm = this.formBuilder.group({
            search: [""],
            state: [true, Validators.required],
        });
    }

    ngOnInit() {
        this.eventsHubService.setSeriesDocumentalesMenu("applications");

        this.refreshList();
    }

    refreshList() {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getApplications(this.searchForm.value.state).subscribe(
            (response: ServerResponseApplications) => {
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

    newItem(): void {
        let application = {
            idAplicacion: null,
            nombreAplicacion: "",
            activo: true,
        }

        this.editForm = this.formBuilder.group({
            idAplicacion: [{ value: application.idAplicacion, disabled: !application.activo}],
            nombreAplicacion: [{ value: application.nombreAplicacion, disabled: !application.activo}, Validators.required],
            activo: [{ value: application.activo, disabled: !application.activo}],
        });
        this.showEditor = true;
    }
    editItem(application: Application): void {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getApplication(application.idAplicacion, this.searchForm.value.state).subscribe(
            (response: ServerResponseApplication) => {
                this.editForm = this.formBuilder.group({
                    idAplicacion: [{ value: response.result.idAplicacion, disabled: !response.result.activo}],
                    nombreAplicacion: [{ value: response.result.nombreAplicacion, disabled: !response.result.activo}, Validators.required],
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

        if (this.editForm.value.idAplicacion) {
            this.seriesDocumentalesService.updateApplication(this.editForm.value).subscribe(
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
            this.seriesDocumentalesService.createApplication(this.editForm.value).subscribe(
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

        this.seriesDocumentalesService.deleteApplication(this.editForm.value.idAplicacion).subscribe(
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

        this.seriesDocumentalesService.undeleteApplication(this.editForm.value.idAplicacion).subscribe(
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
