import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { MatDialogFooterComponent } from '../components/mat-dialog-footer/mat-dialog-footer.component';
import { MatDialogBodyComponent } from '../components/mat-dialog-body/mat-dialog-body.component';
import { MatDialogHeaderComponent } from '../components/mat-dialog-header/mat-dialog-header.component';
import { CommonHeaderComponent } from '../components/common-header/common-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MatDialogHeaderComponent,
        MatDialogBodyComponent,
        MatDialogFooterComponent,
        ConfirmComponent
    ],
    exports: [
        AngularSvgIconModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AgGridModule,
        MatDialogHeaderComponent,
        MatDialogBodyComponent,
        CommonHeaderComponent,
        MatDialogFooterComponent,
        ConfirmComponent
    ], 
    imports: [AngularSvgIconModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonHeaderComponent,
        MaterialModule,
        AngularSvgIconModule.forRoot()
    ], 
    providers: [
        DatePipe, 
        DecimalPipe, 
        CurrencyPipe, 
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class SharedModule { }
