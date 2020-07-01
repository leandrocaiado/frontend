import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CadastroLogComponent } from './cadastroLog/cadastroLog.component';


import { AppComponent } from 'app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from 'app/_helpers/basic-auth.interceptor';
import { FactoryModalService } from 'app/factory-modal.service';
import { ErrorInterceptor } from 'app/_helpers/error.interceptor';
import { AuthGuard } from 'app/_helpers/auth.guard';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CadastroRoutes } from './cadastro.routing';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from 'app/_helpers/ngbDateFRParserFormatter';
import { FileUploadModule } from 'ng2-file-upload';
import localePt from '@angular/common/locales/pt';
import { PesquisaLogComponent } from './pesquisaLog/pesquisaLog.component';
registerLocaleData(localePt);
@NgModule({
    imports: [
        FileUploadModule,
        CommonModule,
        RouterModule.forChild(CadastroRoutes),
        FormsModule,
        NgxMaskModule.forRoot(),
        NgbModule,
        ReactiveFormsModule
    ],
    exports: [
       
        NgxMaskModule
    ],
    declarations: [
        CadastroLogComponent,
        PesquisaLogComponent,

    ], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        FactoryModalService,
        AuthGuard,
        { provide: LOCALE_ID, useValue: 'pt'},      
          {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
   
    ],
    bootstrap:    [ AppComponent ]
})

export class CadastroModule {}
