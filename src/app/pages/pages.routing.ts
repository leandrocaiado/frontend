import { Routes } from '@angular/router';



import { LoginComponent } from './login/login.component';
import { EsqueceuSenhaComponent } from './esqueceu/esqueceuSenha.component';

export const PagesRoutes: Routes = [{
    path: '',
    children: [ {
        path: 'login',
        component: LoginComponent
    },{
        path: 'esqueceu',
        component: EsqueceuSenhaComponent
    }]
}];
