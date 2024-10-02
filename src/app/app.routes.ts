import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: UserProfileComponent},
    {path: '**', redirectTo: '', pathMatch:'full'},
];
