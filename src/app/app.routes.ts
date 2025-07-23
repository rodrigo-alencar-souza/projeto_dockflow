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
import { setorGuard } from './guards/setor.guards';
import { ProcessoDetailComponent } from './detail.process/detail.process';




export const routes: Routes = [
    { path: 'detail-process', component: ProcessoDetailComponent, canActivate: [setorGuard], data: { setor: 'geral' }},
    { path: 'home', component: Home },
    { path: 'sign-up', component: SignUp, canActivate: [setorGuard], data: { setor: 'geral' }},
    { path: 'login', component: Login },
    { path: 'cadastro-usuario', component: UserSignUp},
    { path: 'cadastro-processo', component: SignUp },
    {path: 'editar-processo/:index', component: SignUp},
    { path: 'engenharia', component: Engineering, canActivate: [setorGuard], data: { setor: 'engenharia'} },
    { path: 'producao', component: Production, canActivate: [setorGuard], data: { setor: 'producao'} },
    { path: 'fiscal', component: Tax, canActivate: [setorGuard], data: { setor: 'fiscal'} },
    { path: 'geral', component: General },
    { path: '', redirectTo: 'home', pathMatch: 'full' }];
    
//     { path: 'detail-process', component: ProcessoDetailComponent, canActivate: [setorGuard], data: { setor: 'geral' }}

        
