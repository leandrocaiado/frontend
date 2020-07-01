
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
    
import { NgxMaskModule } from 'ngx-mask';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor} from 'app/_helpers/error.interceptor';


import { AppComponent }   from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { FactoryModalService } from './factory-modal.service';
import { SatDatepickerModule, SatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import localePt from '@angular/common/locales/pt';
import { NgbDateFRParserFormatter } from './_helpers/ngbDateFRParserFormatter';
registerLocaleData(localePt);

@NgModule({
    imports:      [
        BrowserAnimationsModule,
        FormsModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        NgbModule,
        HttpModule,
        NgxMaskModule.forRoot(),
        SidebarModule,
        NavbarModule,
        FooterModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FixedPluginModule
    ],
    exports: [
       
        NgxMaskModule
    ],
    declarations: [
        AppComponent,
        
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],

    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        FactoryModalService,
        AuthGuard,
        DashboardComponent,
        { provide: LOCALE_ID, useValue: 'pt'},
        {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
        
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
