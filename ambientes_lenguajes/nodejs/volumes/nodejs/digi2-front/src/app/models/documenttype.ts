export class DocumentType {
    idTipoDocumento: number;
    nombreTipoDocumento: string;
    descripcionTipoDocumento: string;
    requiereFirmaDigital: boolean;
    requiereTsa: boolean;
    tiposArchivo: number[];
    activo: boolean;
}
