import { Routes } from '@angular/router';
import { Lable } from './label/lable';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { UserSignUp } from './user-sign-up/user-sign-up';
// import { Production } from './production/production';


export const routes: Routes = [{ path: 'home', component: Lable },
    { path: 'login', component: Login },
    { path: 'cadastro-usuario', component: UserSignUp},
    { path: 'cadastro-processo', component: SignUp },
    { path: '', redirectTo: 'home', pathMatch: 'full' }];
