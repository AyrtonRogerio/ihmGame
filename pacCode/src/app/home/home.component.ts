import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  playerName: string = '';

  constructor(private router: Router) {}

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

}
