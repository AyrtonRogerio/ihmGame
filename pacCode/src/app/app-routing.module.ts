import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FasesComponent } from './fases/fases.component';
import { HomeComponent } from './home/home.component';
import { JogoComponent } from './jogo/jogo.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path: '', component: MenuComponent },
  {path: 'home', component: HomeComponent},
  {path: 'fases', component: FasesComponent},
  {path: 'jogo', component: JogoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
