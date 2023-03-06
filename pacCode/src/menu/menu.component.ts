import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/modal/modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  onPageStart(){
    this.router.navigate(['/home'])
  }


    onPageCredits() {
      const dialogRef = this.dialog.open(ModalComponent, {

        data: {
          title: 'Sobre o PacCode',
          message:
            'O PAC-CODE, é um jogo educativo com o propósito de exercitar conceitos sobre programação, utilizando a programação em blocos como um aliado para alcançar esse objetivo. Elaborado por Ayrton Gomes, discente da Universidade Federal Rural de Pernambuco - Campus Serra Talhada, para a disciplina de Interfaces Homem-Máquina, ministrada pelo Professor Doutor Richarlyson DEmery.',
          okButton: 'Ok',
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
