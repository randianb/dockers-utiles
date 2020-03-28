import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { EventsHubService } from "../../../services/eventshub.services";
import { SeriesDocumentalesService } from "../../../services/seriesdocumentales.service";
import { OpenSnackBarService } from "../../../services/opensnackbar.service";
import { ServerResponse, ServerResponseFilesTypes, ServerResponseFileType } from "../../../models/serverresponse";
import { FileType } from "../../../models/filetype";
import { SelectOption } from "../../../models/selectoption";
import { LoadingService } from "../../../components/loading/loading.service";

@Component({
    selector: "seriesdocumentales-filetypes",
    templateUrl: "./filetypes.component.html",
})
export class SeriesDocumentalesFileTypesComponent implements OnInit {
    list: FileType[];
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
        this.eventsHubService.setSeriesDocumentalesMenu("filetypes");

        this.refreshList();
    }

    refreshList() {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getFilesTypes(this.searchForm.value.state).subscribe(
            (response: ServerResponseFilesTypes) => {
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
        let fileType = {
            idExtension: null,
            nombreExtension: "",
            descripcionExtension: "",
            activo: true,
        }

        this.editForm = this.formBuilder.group({
            idExtension: [{ value: fileType.idExtension, disabled: !fileType.activo}],
            nombreExtension: [{ value: fileType.nombreExtension, disabled: !fileType.activo}, [Validators.required, this.validatorExtension]],
            descripcionExtension: [{ value: fileType.descripcionExtension, disabled: !fileType.activo}, Validators.required],
            activo: [{ value: fileType.activo, disabled: !fileType.activo}],
        });
        this.showEditor = true;
    }
    editItem(fileType: FileType): void {
        this.loadingService.show("main");

        this.seriesDocumentalesService.getFileType(fileType.idExtension, this.searchForm.value.state).subscribe(
            (response: ServerResponseFileType) => {
                this.editForm = this.formBuilder.group({
                    idExtension: [{ value: response.result.idExtension, disabled: !response.result.activo}],
                    nombreExtension: [{ value: response.result.nombreExtension, disabled: !response.result.activo}, [Validators.required, this.validatorExtension]],
                    descripcionExtension: [{ value: response.result.descripcionExtension, disabled: !response.result.activo}, Validators.required],
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

        if (this.editForm.value.idExtension) {
            this.seriesDocumentalesService.updateFileType(this.editForm.value).subscribe(
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
            this.seriesDocumentalesService.createFileType(this.editForm.value).subscribe(
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

        this.seriesDocumentalesService.deleteFileType(this.editForm.value.idExtension).subscribe(
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

        this.seriesDocumentalesService.undeleteFileType(this.editForm.value.idExtension).subscribe(
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

    validatorExtension(control: AbstractControl): ValidationErrors {
        let regExp = new RegExp("^[a-zA-Z0-9]{2,4}$");
        if (!regExp.test(control.value)) {
            return { invalid: true };
        }

        return null;
    }
}
