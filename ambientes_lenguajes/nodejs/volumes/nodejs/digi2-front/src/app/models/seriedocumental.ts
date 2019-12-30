export class SerieDocumental {
    idSerieDocumental: number;
    estados: number[];
    nombreSerieDocumental: string;
    descripcionSerieDocumental: string;
    aplicacionesPermitidas: number[];
    confidencial: boolean;
    tiposArchivo: number[];
    requiereFirmaDigital: boolean;
    mesesGuarda: number;
    activo: boolean;
    gruposAD: string[];
    pathGuardado: string;
}
