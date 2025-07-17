import { Routes } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { UserSignUp } from './user-sign-up/user-sign-up';
import { Engineering } from './engineering/engineering';
import { Tax } from './tax/tax';
import { Production } from './production/production';
import { General } from './general/general';
import { Home } from './home/home';




export const routes: Routes = [{ path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'cadastro-usuario', component: UserSignUp},
    { path: 'cadastro-processo', component: SignUp },
    { path: 'engenharia', component: Engineering },
    { path: 'producao', component: Production },
    { path: 'fiscal', component: Tax },
    { path: 'geral', component: General },
    { path: '', redirectTo: 'home', pathMatch: 'full' }];
