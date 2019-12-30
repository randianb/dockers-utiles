import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { EventsHubService } from "../../../services/eventshub.services";
import { SeriesDocumentalesService } from "../../../services/seriesdocumentales.service";
import { OpenSnackBarService } from "../../../services/opensnackbar.service";
import { ServerResponse, ServerResponseStates, ServerResponseState } from "../../../models/serverresponse";
import { State } from "../../../models/state";
import { SelectOption } from "../../../models/selectoption";
import { LoadingService } from "../../../components/loading/loading.service";

@Component({
    selector: "seriesdocumentales-states",
    templateUrl: "./states.component.html",
})
export class SeriesDocumentalesStatesComponent implements OnInit {
    list: State[];
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
        this.eventsHubService.setSeriesDocumentalesMenu("states");

        this.refreshList();
    }

    refreshList() {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getStates(this.searchForm.value.state).subscribe(
            (response: ServerResponseStates) => {
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
        let state = {
            idEstado: null,
            nombreEstado: "",
            descripcionEstado: "",
            activo: true,
        }
        this.editForm = this.formBuilder.group({
            idEstado: [{ value: state.idEstado, disabled: !state.activo}],
            nombreEstado: [{ value: state.nombreEstado, disabled: !state.activo}, Validators.required],
            descripcionEstado: [{ value: state.descripcionEstado, disabled: !state.activo}, Validators.required],
            activo: [{ value: state.activo, disabled: !state.activo}],
        });
        this.showEditor = true;
    }
    editItem(state: State): void {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getState(state.idEstado, this.searchForm.value.state).subscribe(
            (response: ServerResponseState) => {
                this.editForm = this.formBuilder.group({
                    idEstado: [{ value: response.result.idEstado, disabled: !response.result.activo}],
                    nombreEstado: [{ value: response.result.nombreEstado, disabled: !response.result.activo}, Validators.required],
                    descripcionEstado: [{ value: response.result.descripcionEstado, disabled: !response.result.activo}, Validators.required],
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

        if (this.editForm.value.idEstado) {
            this.seriesDocumentalesService.updateState(this.editForm.value).subscribe(
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
            this.seriesDocumentalesService.createState(this.editForm.value).subscribe(
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

        this.seriesDocumentalesService.deleteState(this.editForm.value.idEstado).subscribe(
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

        this.seriesDocumentalesService.undeleteState(this.editForm.value.idEstado).subscribe(
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
