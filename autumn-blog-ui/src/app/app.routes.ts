import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/home/admin-home/admin-home.component';
import { PostsFormComponent } from './admin/posts-dashboard/posts-form/posts-form.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SinglePagePostsComponent } from './posts/single-page-posts/single-page-posts.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {path: 'post/:id', component: SinglePagePostsComponent},
  {
    path: 'posts/new',
    component: PostsFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'posts/edit/:id',
    component: PostsFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'dashboard',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
