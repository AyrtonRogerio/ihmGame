import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fases',
  templateUrl: './fases.component.html',
  styleUrls: ['./fases.component.css']
})
export class FasesComponent {

  fases = [
    { id: 1, nome: 'Fase 1', descricao: 'Descrição da fase 1' },
    { id: 2, nome: 'Fase 2', descricao: 'Descrição da fase 2' },
    { id: 3, nome: 'Fase 3', descricao: 'Descrição da fase 3' },
  ];


  constructor(private router: Router) {}


  iniciarJogo(id: number) {
    this.router.navigate(['/jogo', id]);
  }

  onCardClick(fase: number) {
    this.router.navigate(['/jogo'], { queryParams: { fase } });
  }


  startGame(faseId: number) {
    this.router.navigate(['/jogo', faseId]);
  }

}
