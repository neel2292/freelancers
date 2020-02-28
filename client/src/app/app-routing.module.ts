import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FreelancerComponent} from "./freelancer/freelancer.component";
import {NotFoundComponent} from "./not-found/not-found.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'freelancer/:id', component: FreelancerComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
