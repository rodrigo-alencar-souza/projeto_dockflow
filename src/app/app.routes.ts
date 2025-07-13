import { Routes } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { UserSignUp } from './user-sign-up/user-sign-up';
import { Engineering } from './engineering/engineering';
import { Tax } from './tax/tax';
import { Production } from './production/production';
import { General } from './general/general';

// import { Production } from './production/production';


export const routes: Routes = [{ path: 'home', component: Sidebar },
    { path: 'login', component: Login },
    { path: 'cadastro-usuario', component: UserSignUp},
    { path: 'cadastro-processo', component: SignUp },
    { path: 'engineering', component: Engineering },
    { path: 'production', component: Production },
    { path: 'tax', component: Tax },
    { path: 'general', component: General },
    { path: '', redirectTo: 'home', pathMatch: 'full' }];
