import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './_helpers/auth.guard';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'pages/login',
        pathMatch: 'full',
      },{
        path: '',
        component: AdminLayoutComponent, 
        children: [{
            path: '' ,
            loadChildren: './dashboard/dashboard.module#DashboardModule',
            canActivateChild: [AuthGuard]
        }
     ]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
                
            }]
        }
];
