import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FasesComponent } from './fases/fases.component';
import { JogoComponent } from './jogo/jogo.component';

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
