import { Routes } from '@angular/router';
import { Lable } from './label/lable';
import { Login } from './login/login';

export const routes: Routes = [{ path: 'home', component: Lable },
    { path: 'login', component: Login },
    { path: '', redirectTo: 'home', pathMatch: 'full' }];
