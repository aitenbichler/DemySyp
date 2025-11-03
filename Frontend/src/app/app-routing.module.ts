import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './components/stations/stations.component';
import { StationComponent } from './components/station/station.component';
import { EditStationComponent } from './components/edit-station/edit-station.component';

const routes: Routes = [
  {path: 'stations', component: StationsComponent},
  {path: 'station/:id', component: StationComponent},
  {path: 'edit-station/:id', component: EditStationComponent},
  {path: '', redirectTo: '/stations', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
