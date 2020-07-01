import { Routes } from '@angular/router';

import { CadastroLogComponent } from './cadastroLog/cadastroLog.component';

import { PesquisaLogComponent } from './pesquisaLog/pesquisaLog.component';


export const CadastroRoutes: Routes = [{
        path: '',
        children: [{
            path: 'cadastroLog',
            component: CadastroLogComponent
        }]
    },{
        path: '',
        children: [{
            path: 'pesquisaLog',
            component: PesquisaLogComponent
        }]
    }
];
