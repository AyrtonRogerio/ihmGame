import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-mensagem-alerta',
  templateUrl: './modal-mensagem-alerta.component.html',
  styleUrls: ['./modal-mensagem-alerta.component.scss']
})
export class ModalMensagemAlertaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
