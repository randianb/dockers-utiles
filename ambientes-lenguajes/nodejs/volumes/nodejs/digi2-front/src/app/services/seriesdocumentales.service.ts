import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { AppSettingsService } from "./appsettings.service";
import { ServerResponse, ServerResponseSerieDocumental, ServerResponseSeriesDocumentales, ServerResponseState, ServerResponseStates,
    ServerResponseApplication, ServerResponseApplications, ServerResponseDocumentType, ServerResponseDocumentsTypes, ServerResponseFileType,
    ServerResponseFilesTypes, ServerResponseRoles } from "../models/serverresponse";
import { SelectOption } from "../models/selectoption";
import { SerieDocumental } from "../models/seriedocumental";
import { Application } from "../models/application";
import { State } from "../models/state";
import { DocumentType } from "../models/documenttype";
import { FileType } from "../models/filetype";

@Injectable()
export class SeriesDocumentalesService {
    constructor(private httpClient: HttpClient) {
    }

    // Constants
    get stateOptions(): SelectOption[] {
        return [
            { value: true, viewValue: "Activo" },
            { value: false, viewValue: "Inactivo" }
        ];
    }
    get timeOptions(): SelectOption[] {
        return [
            { value: 1, viewValue: "1 Mes" },
            { value: 2, viewValue: "2 Meses" },
            { value: 3, viewValue: "3 Meses" },
            { value: 4, viewValue: "4 Meses" },
            { value: 5, viewValue: "5 Meses" },
            { value: 6, viewValue: "6 Meses" },
            { value: 7, viewValue: "7 Meses" },
            { value: 8, viewValue: "8 Meses" },
            { value: 9, viewValue: "9 Meses" },
            { value: 10, viewValue: "10 Meses" },
            { value: 11, viewValue: "11 Meses" },
            { value: 12, viewValue: "1 Año" },
            { value: 13, viewValue: "2 Años" },
            { value: 14, viewValue: "3 Años" },
            { value: 15, viewValue: "4 Años" },
            { value: 16, viewValue: "5 Años" }
        ];
    }

    // Roles
    getRoles(search: string): Observable<ServerResponseRoles> {
        return this.httpClient.get<ServerResponseRoles>(AppSettingsService.API_ALFRESCAS + "/utils/searchADGroups/" + search);
    }

    // File Storage
    checkFileStoragePathValid(path: string): Observable<ServerResponse> {
        const postData = {
            path: path,
        };
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/checkStoragePath", postData);
    }

    updateSerieDocumentalStoragePath(serieDocumentalId: number, path: string): Observable<ServerResponse> {
        const postData = {
            idSerieDocumental: serieDocumentalId,
            pathStorage: path,
        };
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/editStoragePath", postData);
    }

    // Series Documentales
    getSerieDocumental(id: number, activo : boolean): Observable<ServerResponseSerieDocumental> {
        return this.httpClient.get<ServerResponseSerieDocumental>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/get/" + id + "/" + !activo);
    }

    getSeriesDocumentales(active: boolean): Observable<ServerResponseSeriesDocumentales> {
        return this.httpClient.get<ServerResponseSeriesDocumentales>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/getAll/" + active);
    }

    createSerieDocumental(serieDocumental: SerieDocumental): Observable<ServerResponse> {
        const postData = {
            estados: serieDocumental.estados,
            nombreSerieDocumental: serieDocumental.nombreSerieDocumental,
            descripcionSerieDocumental: serieDocumental.descripcionSerieDocumental,
            aplicacionesPermitidas: serieDocumental.aplicacionesPermitidas,
            confidencial: serieDocumental.confidencial,
            mesesGuarda: serieDocumental.mesesGuarda,
            tiposArchivo: serieDocumental.tiposArchivo,
            requiereFirmaDigital: serieDocumental.requiereFirmaDigital
        };
        return this.httpClient.post<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/add", postData);
    }

    updateSerieDocumental(serieDocumental: SerieDocumental): Observable<ServerResponse> {
        const postData = {
            idSerieDocumental: serieDocumental.idSerieDocumental,
            estados: serieDocumental.estados,
            nombreSerieDocumental: serieDocumental.nombreSerieDocumental,
            descripcionSerieDocumental: serieDocumental.descripcionSerieDocumental,
            aplicacionesPermitidas: serieDocumental.aplicacionesPermitidas,
            confidencial: serieDocumental.confidencial,
            mesesGuarda: serieDocumental.mesesGuarda,
            tiposArchivo: serieDocumental.tiposArchivo,
            requiereFirmaDigital: serieDocumental.requiereFirmaDigital
        };
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/edit", postData);
    }

    undeleteSerieDocumental(serieDocumentalId: number): Observable<ServerResponse> {
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/logicalActivation/" + serieDocumentalId, null);
    }

    deleteSerieDocumental(serieDocumentalId: number): Observable<ServerResponse> {
        return this.httpClient.delete<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/logicalDelete/" + serieDocumentalId);
    }

    updateSerieDocumentalRoles(serieDocumentalId: number, gruposAD: string[]): Observable<ServerResponse> {
        const postData = {
            idSerieDocumental: serieDocumentalId,
            gruposAD: gruposAD,
        };
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/serieDocumental/editADGroups", postData);
    }

    // States
    getState(id: number, activo : boolean): Observable<ServerResponseState> {
        return this.httpClient.get<ServerResponseState>(AppSettingsService.API_ALFRESCAS + "/estado/get/" + id + "/" + !activo);
    }

    getStates(active: boolean): Observable<ServerResponseStates> {
        return this.httpClient.get<ServerResponseStates>(AppSettingsService.API_ALFRESCAS + "/estado/getAll/" + active);
    }

    createState(state: State): Observable<ServerResponse> {
        const postData = {
            nombreEstado: state.nombreEstado,
            descripcionEstado: state.descripcionEstado,
        };
        return this.httpClient.post<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/estado/add", postData);
    }

    updateState(state: State): Observable<ServerResponse> {
        const postData = {
            idEstado: state.idEstado,
            nombreEstado: state.nombreEstado,
            descripcionEstado: state.descripcionEstado,
        };
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/estado/edit", postData);
    }

    undeleteState(stateId: number): Observable<ServerResponse> {
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/estado/logicalActivation/" + stateId, null);
    }

    deleteState(stateId: number): Observable<ServerResponse> {
        return this.httpClient.delete<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/estado/logicalDelete/" + stateId);
    }

    // Applications
    getApplication(id: number, activo : boolean): Observable<ServerResponseApplication> {
        return this.httpClient.get<ServerResponseApplication>(AppSettingsService.API_ALFRESCAS + "/aplicacion/get/" + id + "/" + !activo);
    }

    getApplications(active: boolean): Observable<ServerResponseApplications> {
        return this.httpClient.get<ServerResponseApplications>(AppSettingsService.API_ALFRESCAS + "/aplicacion/getAll/" + active);
    }

    createApplication(application: Application): Observable<ServerResponse> {
        const postData = {
            nombreAplicacion: application.nombreAplicacion,
        };
        return this.httpClient.post<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/aplicacion/add", postData);
    }

    updateApplication(application: Application): Observable<ServerResponse> {
        const postData = {
            idAplicacion: application.idAplicacion,
            nombreAplicacion: application.nombreAplicacion,
        };
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/aplicacion/edit", postData);
    }

    undeleteApplication(applicationId: number): Observable<ServerResponse> {
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/aplicacion/logicalActivation/" + applicationId, null);
    }

    deleteApplication(applicationId: number): Observable<ServerResponse> {
        return this.httpClient.delete<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/aplicacion/logicalDelete/" + applicationId);
    }

    // Document Types
    // getDocumentType(id: number, activo : boolean): Observable<ServerResponseDocumentType> {
    //     return this.httpClient.get<ServerResponseDocumentType>(AppSettingsService.API_ALFRESCAS + "/tipoDocumento/get/" + id + "/" + !activo);
    // }

    // getDocumentsTypes(active: boolean): Observable<ServerResponseDocumentsTypes> {
    //     return this.httpClient.get<ServerResponseDocumentsTypes>(AppSettingsService.API_ALFRESCAS + "/tipoDocumento/getAll/" + active);
    // }

    // createDocumentType(documentType: DocumentType): Observable<ServerResponse> {
    //     const postData = {
    //         nombreTipoDocumento: documentType.nombreTipoDocumento,
    //         descripcionTipoDocumento: documentType.descripcionTipoDocumento,
    //         requiereFirmaDigital: documentType.requiereFirmaDigital,
    //         requiereTsa: documentType.requiereTsa,
    //         tiposArchivo: documentType.tiposArchivo,
    //     };
    //     return this.httpClient.post<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/tipoDocumento/add", postData);
    // }

    // updateDocumentType(documentType: DocumentType): Observable<ServerResponse> {
    //     const postData = {
    //         idTipoDocumento: documentType.idTipoDocumento,
    //         nombreTipoDocumento: documentType.nombreTipoDocumento,
    //         descripcionTipoDocumento: documentType.descripcionTipoDocumento,
    //         requiereFirmaDigital: documentType.requiereFirmaDigital,
    //         requiereTsa: documentType.requiereTsa,
    //         tiposArchivo: documentType.tiposArchivo,
    //     };
    //     return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/tipoDocumento/edit", postData);
    // }

    // undeleteDocumentType(documentTypeId: number): Observable<ServerResponse> {
    //     return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/tipoDocumento/logicalActivation/" + documentTypeId, null);
    // }

    // deleteDocumentType(documentTypeId: number): Observable<ServerResponse> {
    //     return this.httpClient.delete<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/tipoDocumento/logicalDelete/" + documentTypeId);
    // }


    // File Types
    getFileType(id: number, activo : boolean): Observable<ServerResponseFileType> {
        return this.httpClient.get<ServerResponseFileType>(AppSettingsService.API_ALFRESCAS + "/extension/get/" + id + "/" + !activo);
    }

    getFilesTypes(active: boolean): Observable<ServerResponseFilesTypes> {
        return this.httpClient.get<ServerResponseFilesTypes>(AppSettingsService.API_ALFRESCAS + "/extension/getAll/" + active);
    }

    createFileType(fileType: FileType): Observable<ServerResponse> {
        const postData = {
            nombreExtension: fileType.nombreExtension.toUpperCase(),
            descripcionExtension: fileType.descripcionExtension,
        };
        return this.httpClient.post<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/extension/add", postData);
    }

    updateFileType(fileType: FileType): Observable<ServerResponse> {
        const postData = {
            idExtension: fileType.idExtension,
            nombreExtension: fileType.nombreExtension.toUpperCase(),
            descripcionExtension: fileType.descripcionExtension,
        };
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/extension/edit", postData);
    }

    undeleteFileType(fileTypeId: number): Observable<ServerResponse> {
        return this.httpClient.put<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/extension/logicalActivation/" + fileTypeId, null);
    }

    deleteFileType(fileTypeId: number): Observable<ServerResponse> {
        return this.httpClient.delete<ServerResponse>(AppSettingsService.API_ALFRESCAS + "/extension/logicalDelete/" + fileTypeId);
    }
}
