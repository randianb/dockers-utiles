import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { EventsHubService } from "../../../services/eventshub.services";
import { SeriesDocumentalesService } from "../../../services/seriesdocumentales.service";
import { OpenSnackBarService } from "../../../services/opensnackbar.service";
import { ServerResponse, ServerResponseSeriesDocumentales, ServerResponseStates, ServerResponseDocumentsTypes } from "../../../models/serverresponse";
import { SerieDocumental } from "../../../models/seriedocumental";
import { DocumentType } from "../../../models/documenttype";
import { State } from "../../../models/state";
import { Application } from "../../../models/application";
import { SelectOption } from "../../../models/selectoption";
import { LoadingService } from "../../../components/loading/loading.service";

@Component({
    selector: "seriesdocumentales-filemanager",
    templateUrl: "./filemanager.component.html",
})
export class SeriesDocumentalesFileManagerComponent implements OnInit {
    list: SerieDocumental[];
    stateOptions: SelectOption[];
    searchForm: FormGroup;
    editForm: FormGroup;
    showEditor: boolean;

    constructor(private eventsHubService: EventsHubService, private loadingService: LoadingService, private formBuilder: FormBuilder,
        private seriesDocumentalesService: SeriesDocumentalesService,
        private openSnackBarService: OpenSnackBarService) {

        this.stateOptions = this.seriesDocumentalesService.stateOptions;
        this.showEditor = false;

        this.searchForm = this.formBuilder.group({
            search: [""],
            state: [true, Validators.required],
        });
    }

    ngOnInit() {
        this.eventsHubService.setSeriesDocumentalesMenu("filemanager");

        this.refreshList();
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

    viewItem(serieDocumental: SerieDocumental) {
        console.log("View: " + serieDocumental.nombreSerieDocumental);
    }
}
