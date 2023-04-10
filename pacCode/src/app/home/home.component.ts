import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ModalMensagemAlertaComponent} from "../modal-mensagem-alerta/modal-mensagem-alerta.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  playerName: string = '';

  constructor(public dialog: MatDialog, private router: Router) {}

  // Valida se o nome do jogador é válido
  isNameInvalid(): boolean {
    return !this.playerName;
  }

  // Navega para a próxima página se o nome do jogador for válido
  onNextPage() {
    localStorage.setItem("namePlayer", this.playerName);
    this.router.navigate(['/fases']);
  }

  // Limita o tamanho do campo de nome e valida o seu conteúdo
  validateName() {
    this.playerName = this.playerName.substring(0, 20);
    this.playerName = this.playerName.trim();
  }

  onAlertMessage(titulo: string){
    const dialogRef = this.dialog.open(ModalMensagemAlertaComponent, {
      data: {
        title: titulo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog fechado');
    });

    if (dialogRef.componentInstance.data && dialogRef.componentInstance.data.message) {
      console.log(dialogRef.componentInstance.data.message);
    }
  }

}
