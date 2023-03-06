import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AppComponent } from './app.component';
import { MenuComponent } from '../menu/menu.component';
// import { CreditosComponent } from '../creditos/creditos.component';
import { FasesComponent } from './fases/fases.component';

const routes: Routes = [

  {path: '', component: MenuComponent },
  {path: 'home', component: HomeComponent},
  // {path: 'creditos', component: CreditosComponent},
  {path: 'fases', component: FasesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
