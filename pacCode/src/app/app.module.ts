import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from "@angular/material/list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './menu/menu.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FasesComponent } from './fases/fases.component';
import { JogoComponent } from './jogo/jogo.component';
import { FaseFuncaoComponent } from './fase-funcao/fase-funcao.component';
import { FaseFuncaoHardComponent } from './fase-funcao-hard/fase-funcao-hard.component';
import { ModalMensagemFaseSucessComponent } from './modal-mensagem-fase-sucess/modal-mensagem-fase-sucess.component';
import { ModalMensagemFaseFailedComponent } from './modal-mensagem-fase-failed/modal-mensagem-fase-failed.component';
import {MatCardModule} from "@angular/material/card";
import { ModalMensagemFase2SucessComponent } from './modal-mensagem-fase2-sucess/modal-mensagem-fase2-sucess.component';
import { ModalMensagemFase3SucessComponent } from './modal-mensagem-fase3-sucess/modal-mensagem-fase3-sucess.component';
import { ModalMensagemFase2FailedComponent } from './modal-mensagem-fase2-failed/modal-mensagem-fase2-failed.component';
import { ModalMensagemFase3FailedComponent } from './modal-mensagem-fase3-failed/modal-mensagem-fase3-failed.component';
import { ModalMensagemAlertaComponent } from './modal-mensagem-alerta/modal-mensagem-alerta.component';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    MenuComponent,
    FasesComponent,
    JogoComponent,
    FaseFuncaoComponent,
    FaseFuncaoHardComponent,
    ModalMensagemFaseSucessComponent,
    ModalMensagemFaseFailedComponent,
    ModalMensagemFase2SucessComponent,
    ModalMensagemFase3SucessComponent,
    ModalMensagemFase2FailedComponent,
    ModalMensagemFase3FailedComponent,
    ModalMensagemAlertaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
