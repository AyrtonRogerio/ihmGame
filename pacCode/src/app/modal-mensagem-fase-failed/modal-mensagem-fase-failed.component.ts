import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-mensagem-fase-failed',
  templateUrl: './modal-mensagem-fase-failed.component.html',
  styleUrls: ['./modal-mensagem-fase-failed.component.scss']
})
export class ModalMensagemFaseFailedComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
