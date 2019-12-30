import { UserRoles } from "./userroles";
import { SerieDocumental } from "./seriedocumental";
import { State } from "./state";
import { Application } from "./application";
import { DocumentType } from "./documenttype";
import { FileType } from "./filetype";

export class ServerResponse {
    success: boolean;
    msg: string;
}

export class ServerResponseUserRoles extends ServerResponse {
    data: UserRoles;
}

export class ServerResponseRxfMatrix extends ServerResponse {
    result: string[];
}

export class ServerResponseSerieDocumental extends ServerResponse {
    result: SerieDocumental;
}
export class ServerResponseSeriesDocumentales extends ServerResponse {
    result: SerieDocumental[];
    total_items: number;
}

export class ServerResponseState extends ServerResponse {
    result: State;
}
export class ServerResponseStates extends ServerResponse {
    result: State[];
    total_items: number;
}

export class ServerResponseApplication extends ServerResponse {
    result: Application;
}
export class ServerResponseApplications extends ServerResponse {
    result: Application[];
    total_items: number;
}

export class ServerResponseDocumentType extends ServerResponse {
    result: DocumentType;
}
export class ServerResponseDocumentsTypes extends ServerResponse {
    result: DocumentType[];
    total_items: number;
}

export class ServerResponseFileType extends ServerResponse {
    result: FileType;
}
export class ServerResponseFilesTypes extends ServerResponse {
    result: FileType[];
    total_items: number;
}

export class ServerResponseRoles extends ServerResponse {
    result: string[];
    total_items: number;
}
