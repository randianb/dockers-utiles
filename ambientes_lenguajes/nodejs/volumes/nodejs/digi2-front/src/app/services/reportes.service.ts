import { AppSettingsService } from './appsettings.service';
import { MatTableDataSource } from '@angular/material';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { DocumentosXMes } from '../models/documentosxmes';
import { DocumentosXAno } from '../models/documentosxano';
import { DocumentosXMesAno } from '../models/documentosxmesano';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReportesService {
    constructor(private httpClient: HttpClient) {
    }

    getDocumentosPorMes(anio: number) {
        return this.httpClient.get(AppSettingsService.API_ALFRESCAS + "/report/documentosXMes/" + anio);
        // this.Loading.show('main');
        // this.ReportesService.getDocumentosPorMes(anio).then((result) => {
        //     if (result.success) {
        //         this.dataSource1 = new MatTableDataSource<DocumentosXMes>(result.result.map(function (res) {
        //             return <DocumentosXMes>res;
        //         }));
        //     }
        //     else {
        //         this.OpenSnackBarService.openAlert(result, 'error');
        //     }
        //     this.Loading.hide('main');
        // }).catch((data) => {
        //     this.Loading.hide('main');
        //     this.OpenSnackBarService.openAlert(data, 'error');
        // });
    }

    getDocumentosPorAnio() {
        return this.httpClient.get<Array<DocumentosXAno>>(AppSettingsService.API_ALFRESCAS + "/report/documentosXAno");
        // this.Loading.show('main');
        // this.ReportesService.getDocumentosPorAnio().then((result) => {
        //     if (result.success) {
        //         this.dataSource2 = new MatTableDataSource<DocumentosXAno>(result.result.map(function (res) {
        //             return <DocumentosXAno>res;
        //         }));
        //     } else {
        //         this.OpenSnackBarService.openAlert(result, 'error');
        //     }
        //     this.Loading.hide('main');
        // }).catch((data) => {
        //     this.Loading.hide('main');
        //     this.OpenSnackBarService.openAlert(data, 'error');
        // });
    }

    getDocumentosPorMesAnio(anio: number, mes: number) {
        return this.httpClient.get<Array<DocumentosXMesAno>>(AppSettingsService.API_ALFRESCAS + "/report/documentosXMesAno/" + anio + "/" + mes);
        // this.Loading.show('main');
        // this.ReportesService.getDocumentosPorMesAnio(anio, mes).then((result) => {
        //     if (result.success) {
        //         this.dataSource3 = new MatTableDataSource<DocumentosXMesAno>(result.result.map(function (res) {
        //             return <DocumentosXMesAno>res;
        //         }));
        //     }
        //     else {
        //         this.OpenSnackBarService.openAlert(result, 'error');
        //     }
        //     this.Loading.hide('main');
        // }).catch((data) => {
        //     this.Loading.hide('main');
        //     this.OpenSnackBarService.openAlert(data, 'error');
        // });
    }
}