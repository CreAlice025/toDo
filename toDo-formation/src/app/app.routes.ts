import { Routes } from '@angular/router';
import { Login } from '../public/page/login/login';
import { authGuard } from '../Services/auth-service/authguard';


export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('../private/page/dashboard/dashboard').then(m => m.Dashboard)
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
