import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackByComponent } from './components/track-by/track-by.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'track-by',
    pathMatch: 'full',
  },
  {
    path: 'track-by',
    component: TrackByComponent,
  },
  {
    path: 'sentiment/:id',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
