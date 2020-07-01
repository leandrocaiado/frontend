import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';

import { EsqueceuSenhaComponent } from './esqueceu/esqueceuSenha.component';

import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from 'app/_helpers/basic-auth.interceptor';
import { ErrorInterceptor } from 'app/_helpers/error.interceptor';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AuthGuard } from 'app/_helpers/auth.guard';
import { FactoryModalService } from 'app/factory-modal.service';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { AppComponent } from 'app/app.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        EsqueceuSenhaComponent
        
    ],

    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        FactoryModalService,
        AuthGuard,
        DashboardComponent,
        {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: {
            parse: {
                dateInput: ['DD/MM/YYYY', 'l'],
            },
            display: {
                dateInput: 'DD/MM/YYYY',
                monthYearLabel: 'MMM YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'MMMM YYYY',
            },
        }}
    ],
    bootstrap:    [ AppComponent ]
})

export class PagesModule {}
