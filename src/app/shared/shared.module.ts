import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrModule } from 'ngx-toastr';

import { NgxMaskModule } from 'ngx-mask';
const componentsEntry = [
];

const components = [
    ...componentsEntry
];



@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        SatDatepickerModule,
        SatNativeDateModule,
        NgxMaskModule,
        MatDatepickerModule
    ],
    entryComponents: componentsEntry,
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
    declarations: components
})
export class SharedModule { }
