import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-mensagem-fase2-failed',
  templateUrl: './modal-mensagem-fase2-failed.component.html',
  styleUrls: ['./modal-mensagem-fase2-failed.component.scss']
})
export class ModalMensagemFase2FailedComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
