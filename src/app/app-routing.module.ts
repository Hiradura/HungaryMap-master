import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ProfileComponent } from './profile/profile.component';
import { loggedUserGuard } from './logged-user.guard';



const routes: Routes = [
  {path:"map",component:MapComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"side-panel", component:SidePanelComponent},
  {path:"settlements",component:SettlementsComponent},
  {path:"comments",component:CommentsComponent, canActivate:[loggedUserGuard]},
  {path:'comments/:helysegnev',component:CommentsComponent},
  {path: "login", component: LoginComponent },
  {path:"profile", component:ProfileComponent, canActivate:[loggedUserGuard]},
  {path: "register", component: RegisterComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
