import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'profile', component: UserProfileComponent, canActivate: [authGuard]},
    {path: 'edit', component: EditPostComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: '', pathMatch:'full'},
];
