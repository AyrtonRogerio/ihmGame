import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-mensagem-fase-sucess',
  templateUrl: './modal-mensagem-fase-sucess.component.html',
  styleUrls: ['./modal-mensagem-fase-sucess.component.scss']
})
export class ModalMensagemFaseSucessComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }



}
