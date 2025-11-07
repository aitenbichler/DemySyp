import { Routes } from '@angular/router';
import { MDemosComponent } from './mdemos/mdemos.component';
import { GameDetailComponent } from './game.detail/game.detail.component';
import { MDemoAddComponent } from './mdemo.add/mdemo.add.component';
import { GameUpdateComponent } from './game.update/game.update.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { createAuthGuard } from 'keycloak-angular';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { canActivateAuthRole } from './guards/auth-role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },  
  { path: 'mdemos', component: MDemosComponent, canActivate: [canActivateAuthRole],   data: { role: 'myUserRole'}, },
  { path: 'mdemo-add', component: MDemoAddComponent, canActivate: [canActivateAuthRole],   data: { role: 'myUserRole'},  },
  { path: 'game-detail/:id', component: GameDetailComponent, canActivate: [canActivateAuthRole],   data: { role: 'myUserRole'},  },
  { path: 'game-update/:id', component: GameUpdateComponent, canActivate: [canActivateAuthRole],   data: { role: 'myUserRole'},  },
  { path: 'admin', component: AdminComponent, canActivate: [canActivateAuthRole],   data: { role: 'myAdminRole'},  },
  { path: 'profile', component: UserProfileComponent,  canActivate: [canActivateAuthRole],    data: { role: 'view-profile' }  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: '/home' } 
];
