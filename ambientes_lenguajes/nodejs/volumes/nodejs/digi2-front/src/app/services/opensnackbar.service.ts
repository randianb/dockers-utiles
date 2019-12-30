import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class OpenSnackBarService {
    constructor(private snackBar: MatSnackBar) {
    }

    openAlert(msg, type) {
        let snackBarRef = this.snackBar.open(msg, "Cerrar", {
            duration: 5000,
            extraClasses: [type + "-snackbar"]
        });
    }
}
