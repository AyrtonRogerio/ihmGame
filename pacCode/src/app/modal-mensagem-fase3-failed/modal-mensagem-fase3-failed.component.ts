import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-mensagem-fase3-failed',
  templateUrl: './modal-mensagem-fase3-failed.component.html',
  styleUrls: ['./modal-mensagem-fase3-failed.component.scss']
})
export class ModalMensagemFase3FailedComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }
}
