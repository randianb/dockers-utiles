import { ReportesService } from './../../../services/reportes.service';
import { OpenSnackBarService } from './../../../services/opensnackbar.service';
import { LoadingService } from './../../../components/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
// import { LoadingService } from '../../../shared/loading/loading.service';
import { Router } from "@angular/router";
import { DataSource } from '@angular/cdk/collections';
// import { ReportesService } from './reportes.service';
// import { OpenSnackBarService } from '../../../shared/open-snack-bar.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentosXMes } from '../../../models/documentosxmes';
import { DocumentosXAno } from '../../../models/documentosxano';
import { DocumentosXMesAno } from '../../../models/documentosxmesano';

@Component({
    selector: 'seriesdocumentales-reports',
    templateUrl: './reports.component.html',
    styleUrls: ["./reports.component.scss"],
})
export class SeriesDocumentalesReportsComponent implements OnInit {

    public filtrosForm: FormGroup;
    public reporte: number;

    public mostrarReporte1: boolean = false;
    public mostrarReporte2: boolean = false;
    public mostrarReporte3: boolean = false;

    public mostrarFiltroAnio: boolean = true;
    public mostrarFiltroMes: boolean = false;
    public mostrarBoton: boolean = true;

    public meses: any[] = [{ display: "Enero", value: 1 }, { display: "Febrero", value: 2 }, { display: "Marzo", value: 3 }, { display: "Abril", value: 4 }, { display: "Mayo", value: 5 },
    { display: "Junio", value: 6 }, { display: "Julio", value: 7 }, { display: "Agosto", value: 8 }, { display: "Septiembre", value: 9 }, { display: "Octubre", value: 10 },
    { display: "Nobiembre", value: 11 }, { display: "Diciembre", value: 12 }];

    displayedColumns1 = ['codigoSistema', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    dataSource1 = new MatTableDataSource<DocumentosXMes>();
    displayedColumns2 = ['codigoSistema', 'ano', 'cantidad'];
    dataSource2 = new MatTableDataSource<DocumentosXAno>();
    displayedColumns3 = ['codigoSistema', 'estado', 'cantidad'];
    dataSource3 = new MatTableDataSource<DocumentosXMesAno>();

    @ViewChild(MatPaginator) paginator1: MatPaginator;
    @ViewChild(MatPaginator) paginator2: MatPaginator;
    @ViewChild(MatPaginator) paginator3: MatPaginator;

    /**
     * Set the paginator after the view init since this component will
     * be able to query its view for the initialized paginator.
     */
    ngAfterViewInit() {
        this.dataSource1.paginator = this.paginator1;
        this.dataSource2.paginator = this.paginator2;
        this.dataSource3.paginator = this.paginator3;
    }

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private Loading: LoadingService,
        private ReportesService: ReportesService,
        private OpenSnackBarService: OpenSnackBarService
    ) {
        var today = new Date();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        this.filtrosForm = this.formBuilder.group({
            anio: [yyyy, Validators.required],
            mes: [mm, Validators.required]
        });
        this.reporte = 1;
        this.mostrarReporte1 = true;
    }

    ngOnInit() {

    }

    selectReporte(reporte: number) {
        this.reporte = reporte;
        switch (reporte) {
            case 1:
                this.mostrarReporte1 = true;
                this.mostrarReporte2 = false;
                this.mostrarReporte3 = false;
                this.mostrarFiltroAnio = true;
                this.mostrarFiltroMes = false;
                this.mostrarBoton = true;
                break;
            case 2:
                this.mostrarReporte1 = false;
                this.mostrarReporte2 = true;
                this.mostrarReporte3 = false;
                this.mostrarFiltroAnio = false;
                this.mostrarFiltroMes = false;
                this.mostrarBoton = false;
                this.getDocumentosPorAnio();
                break;
            case 3:
                this.mostrarReporte1 = false;
                this.mostrarReporte2 = false;
                this.mostrarReporte3 = true;
                this.mostrarFiltroAnio = true;
                this.mostrarFiltroMes = true;
                this.mostrarBoton = true;
                break;
            default:
                break;
        }
    }

    filtrar() {
        let anio = this.filtrosForm.controls.anio.value;
        let mes = this.filtrosForm.controls.mes.value;
        switch (this.reporte) {
            case 1:
                this.getDocumentosPorMes(anio);
                break;
            case 2:
                this.getDocumentosPorAnio();
                break;
            case 3:
                this.getDocumentosPorMesAnio(anio, mes);
                break;
            default:
                break;
        }
    }

    downloadExcel() {
        var data = undefined;
        switch (this.reporte) {
            case 1:
                data = "<table><tr>" + this.displayedColumns1.map(x => { return "<td>" + x + "</td>" }).join("") + "</tr>" +
                    this.dataSource1.data.map(x => {
                        return "<tr><td>" + x.codigoSistema + "</td>" +
                            "<td>" + x.enero + "</td>" +
                            "<td>" + x.febrero + "</td>" +
                            "<td>" + x.marzo + "</td>" +
                            "<td>" + x.abril + "</td>" +
                            "<td>" + x.mayo + "</td>" +
                            "<td>" + x.junio + "</td>" +
                            "<td>" + x.julio + "</td>" +
                            "<td>" + x.agosto + "</td>" +
                            "<td>" + x.septiembre + "</td>" +
                            "<td>" + x.octubre + "</td>" +
                            "<td>" + x.noviembre + "</td>" +
                            "<td>" + x.diciembre + "</td></tr>";
                    }).join("") + "</table>";
                break;
            case 2:
                data = "<table><tr>" + this.displayedColumns2.map(x => { return "<td>" + x + "</td>" }).join("") + "</tr>" +
                    this.dataSource2.data.map(x => {
                        return "<tr><td>" + x.codigoSistema + "</td>" +
                            "<td>" + x.ano + "</td>" +
                            "<td>" + x.cantidad + "</td></tr>";
                    }).join("") + "</table>";
                break;
            case 3:
                console.log(this.dataSource3.data)
                data = "<table><tr>" + this.displayedColumns3.map(x => { return "<td>" + x + "</td>" }).join("") + "</tr>" +
                    this.dataSource3.data.map(x => {
                        return "<tr><td>" + x.codigoSistema + "</td>" +
                            "<td>" + x.estado + "</td>" +
                            "<td>" + x.cantidad + "</td></tr>";
                    }).join("") + "</table>";
                break;
            default:
                break;
        }
        console.log(data)
        var blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    }

    private getDocumentosPorMes(anio: number) {
        this.Loading.show('main');
        this.ReportesService.getDocumentosPorMes(anio).subscribe((data) => {
            if (data['success']) {
                this.dataSource1 = new MatTableDataSource<DocumentosXMes>(data['result'].map(function (res) {
                    return <DocumentosXMes>res;
                }));
            }
            else {
                this.OpenSnackBarService.openAlert(data, 'error');
            }
            this.Loading.hide('main');
        }, (error) => {
            this.Loading.hide('main');
            this.OpenSnackBarService.openAlert(error, 'error');
        });
    }

    private getDocumentosPorAnio() {
        this.Loading.show('main');
        this.ReportesService.getDocumentosPorAnio().subscribe((data)=>{
            if (data['success']) {
                this.dataSource2 = new MatTableDataSource<DocumentosXAno>(data['result'].map(function (res) {
                    return <DocumentosXAno>res;
                }));
            } else {
                this.OpenSnackBarService.openAlert(data, 'error');
            }
            this.Loading.hide('main');
        }, (error) => {
                this.Loading.hide('main');
                this.OpenSnackBarService.openAlert(error, 'error');
        });
    }

    getDocumentosPorMesAnio(anio: number, mes: number) {
        this.Loading.show('main');
        this.ReportesService.getDocumentosPorMesAnio(anio, mes).subscribe((data)=>{
            if (data['success']) {
                this.dataSource3 = new MatTableDataSource<DocumentosXMesAno>(data['result'].map(function (res) {
                    return <DocumentosXMesAno>res;
                }));
            }
            else {
                this.OpenSnackBarService.openAlert(data, 'error');
            }
            this.Loading.hide('main');
        }, (error) => {
            this.Loading.hide('main');
            this.OpenSnackBarService.openAlert(error, 'error');
        });
    }
}
