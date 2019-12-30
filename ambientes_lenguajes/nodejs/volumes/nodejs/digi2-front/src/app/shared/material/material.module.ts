import { NgModule } from "@angular/core";
import { MatIconRegistry,
    MatDialogModule, MatListModule, MatIconModule, MatTooltipModule, MatNativeDateModule, MatSelectModule,
    MatInputModule, MatButtonModule, MatRadioModule, MatSlideToggleModule, MatMenuModule, MatTableModule, MatPaginatorModule,
    MatSnackBarModule } from "@angular/material";

const materialComponents = [
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
];

@NgModule({
    imports: [
        materialComponents,
    ],
    exports: [
        materialComponents,
    ],
    providers: [
        MatIconRegistry,
    ],
})
export class AppMaterialModule {
}
