import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-mensagem-fase2-sucess',
  templateUrl: './modal-mensagem-fase2-sucess.component.html',
  styleUrls: ['./modal-mensagem-fase2-sucess.component.scss']
})
export class ModalMensagemFase2SucessComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
