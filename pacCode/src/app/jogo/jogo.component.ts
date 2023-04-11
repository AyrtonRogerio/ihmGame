import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemDirecao } from '../model/DragDropDirecao';
import { Sprite } from '../model/Sprite';
import { Colisao } from '../util/colisao';
import { Limite } from '../model/limite';
import { offset } from '../util/offset';
import { Posicao } from '../model/posicao';
import {ModalMensagemFaseSucessComponent} from "../modal-mensagem-fase-sucess/modal-mensagem-fase-sucess.component";
import {ModalMensagemFaseFailedComponent} from "../modal-mensagem-fase-failed/modal-mensagem-fase-failed.component";
import {ModalMensagemAlertaComponent} from "../modal-mensagem-alerta/modal-mensagem-alerta.component";

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {


  @ViewChild('myCanvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement> | undefined;
  ctx!: CanvasRenderingContext2D;

  @Output() showDialogResult = new EventEmitter();

  background!: Sprite;
  jogador!: Sprite;

  moedasFaseUm!: Sprite[];

  boundaries = <any>[];
  collisionsMap = [];

  directions!: string[];

  animation = false;
  pixelMove = 0;

  fase = 1


  constructor(
    public dialog: MatDialog,
    private router: Router,

  ) {}



  ngOnInit(): void {
// se função, criar lófica para ler o que veio como função
this.directions = []


// @ts-ignore
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';

    this.loadCollisions();

    this.loadBackground();

    this.loadPlayer();

    this.loadMedals()

    this.onAnimate();
  }

  commands: string[] = [];
  availableDirections: string[] = ['up', 'right', 'down', 'left'];

  onDragStart(event: DragEvent, command: string) {
    // @ts-ignore
    event.dataTransfer.setData('text/plain', command);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, destination: string) {
    event.preventDefault();
    // @ts-ignore
    const command = event.dataTransfer.getData('text/plain');
     if (destination === 'main') {
       if(this.commands.length <8){
         this.commands.push(command);
       } else {
         this.onAlertMessage('Você atingiu o máximo de comandos para o main!');
       }
    }
  }

  changeDirection(commandIndex: number) {
    const currentDirection = this.commands[commandIndex];
    const possibleDirections = ['up', 'right', 'down', 'left'];
    let newDirection = currentDirection;

    for (let i = 1; i <= 4; i++) {
      const nextIndex = (possibleDirections.indexOf(newDirection) + i) % 4;
      const nextDirection = possibleDirections[nextIndex];

      if (!this.commands.includes(nextDirection)) {
        newDirection = nextDirection;
        break;
      }
    }

    this.commands[commandIndex] = newDirection;
  }



  getCommandImage(command: string): string {
    switch (command) {
      case 'up':
        return '../../assets/icons/Cima.svg';
      case 'down':
        return '../../assets/icons/Baixo.svg';
      case 'left':
        return '../../assets/icons/Esquerda.svg';
      case 'right':
        return '../../assets/icons/Direita.svg';
      default:
        return '';
    }
  }

  deleteLastCommand(): void {
    if(this.commands.length > 0){
      this.commands.pop();
    }  else {
      this.onAlertMessage('Nenhum comando no main para excluir!');
    }
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

  onSucessMensage(){
    const dialogRef = this.dialog.open(ModalMensagemFaseSucessComponent, {

      data: {
        title: 'Fase concluída!',

      },

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog fechado');
    });

    if (dialogRef.componentInstance.data && dialogRef.componentInstance.data.message) {
      console.log(dialogRef.componentInstance.data.message);
    }
  }

  onFailMessage(){
    const dialogRef = this.dialog.open(ModalMensagemFaseFailedComponent, {

      data: {
        title: 'Tente novamente!',

      },

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog fechado');
    });

    if (dialogRef.componentInstance.data && dialogRef.componentInstance.data.message) {
      console.log(dialogRef.componentInstance.data.message);
    }
  }

  loadCollisions() {
    const collisions = Colisao.loadColisao(1);

    for (let i = 0; i < collisions.length; i += 30) {
      // @ts-ignore
      this.collisionsMap.push(collisions.slice(i, 30 + i));
    }

    this.collisionsMap.forEach((row: any, i) => {
      row.forEach((symbol: any, j: number) => {
        if (symbol === 177) {
          this.boundaries.push
          (new Limite({
              x: j * 32,
              y: i * 32
            })
          );
        }
      })
    });
  }

  loadBackground() {
    const image = new Image();

    if (this.fase === 1) {
      image.src = "../../assets/pacCodeFase1Map.png"
    } else if (this.fase === 2) {
      image.src = "../../assets/pacCodeFase1Map.png"
    } else if (this.fase === 3) {
      image.src = "../../assets/pacCodeFase1Map.png"
    }
    this.background = new Sprite({
        x: offset.x,
        y: offset.y
      }, image
    )
  }


  loadPlayer() {
    const playerDownImage = new Image();
    playerDownImage.src = '../../assets/personagem/moveDown.png';
    const playerUpImage = new Image();
    playerUpImage.src = '../../assets/personagem/moveUp.png';
    const playerLeftImage = new Image();
    playerLeftImage.src = '../../assets/personagem/moveLeft.png';
    const playerRightImage = new Image();
    playerRightImage.src = '../../assets/personagem/moveRight.png';

    let p = new Posicao(65, 320)
    if (this.fase === 2) {
      p = new Posicao(326, 160)
    }
    if (this.fase === 3) {
      p = new Posicao(68, 224)
    }


    this.jogador = new Sprite(p,
      playerRightImage,
      0,
      {max: 3},
      {
        top: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        bottom: playerDownImage
      }
    );

  }

  detectCollision(rect1: Sprite, rect2: any) {
    return (rect1.posicao.x < rect2.posicao.x + rect2.largura &&
      rect1.posicao.x + rect1.largura > rect2.posicao.x &&
      rect1.posicao.y < rect2.posicao.y + rect2.altura &&
      rect1.posicao.y + rect1.altura > rect2.posicao.y)
  }


  loadMedals() {
    const moedasImage = new Image();
    const moedasImage2 = new Image();
    const moedasImage3 = new Image();
    const moedasImage4 = new Image();
    const moedasImage5 = new Image();
    const moedasImage6 = new Image();
    const moedasImage7 = new Image();
    const moedasImage8 = new Image();
    const moedasImage9 = new Image();

    moedasImage.src = '../../assets/moeda.png';
    moedasImage2.src = '../../assets/moeda.png';
    moedasImage3.src = '../../assets/moeda.png';
    moedasImage4.src = '../../assets/moeda.png';
    moedasImage5.src = '../../assets/moeda.png';
    moedasImage6.src = '../../assets/moeda.png';
    moedasImage7.src = '../../assets/moeda.png';
    moedasImage8.src = '../../assets/moeda.png';
    moedasImage9.src = '../../assets/moeda.png';

    if (this.fase === 1) {
      this.moedasFaseUm = [
        new Sprite({x: 106, y: 330}, moedasImage, 0, {max: 1}),
        new Sprite({x: 136, y: 330}, moedasImage2, 0, {max: 1}),
        new Sprite({x: 168, y: 330}, moedasImage3, 0, {max: 1}),
        new Sprite({x: 168, y: 296}, moedasImage4, 0, {max: 1}),
        new Sprite({x: 200, y: 296}, moedasImage5, 0, {max: 1}),
        new Sprite({x: 232, y: 296}, moedasImage6, 0, {max: 1}),
        new Sprite({x: 232, y: 330}, moedasImage7, 0, {max: 1}),
        new Sprite({x: 260, y: 330}, moedasImage8, 0, {max: 1}),

      ]
    }
    if (this.fase === 2) {
      this.moedasFaseUm = [
        new Sprite({x: 168, y: 200}, moedasImage, 0, {max: 1}),
        new Sprite({x: 200, y: 234}, moedasImage2, 0, {max: 1}),
        new Sprite({x: 232, y: 234}, moedasImage3, 0, {max: 1}),
        new Sprite({x: 266, y: 234}, moedasImage4, 0, {max: 1}),
        new Sprite({x: 298, y: 234}, moedasImage5, 0, {max: 1}),
        new Sprite({x: 328, y: 200}, moedasImage6, 0, {max: 1}),
      ]
    }
    if (this.fase === 3) {
      this.moedasFaseUm = [
        new Sprite({x: 168, y: 200}, moedasImage, 0, {max: 10}),
        new Sprite({x: 200, y: 234}, moedasImage2, 0, {max: 10}),
        new Sprite({x: 232, y: 234}, moedasImage3, 0, {max: 10}),
        new Sprite({x: 266, y: 264}, moedasImage4, 0, {max: 10}),
        new Sprite({x: 298, y: 264}, moedasImage5, 0, {max: 10}),
        new Sprite({x: 328, y: 234}, moedasImage6, 0, {max: 10}),
        new Sprite({x: 358, y: 234}, moedasImage7, 0, {max: 10}),
        new Sprite({x: 388, y: 264}, moedasImage8, 0, {max: 10}),
        new Sprite({x: 418, y: 264}, moedasImage9, 0, {max: 10}),
      ]
    }
  }

  startAnimations() {

    if(this.commands.length > 0){
      for(let i = 0; i < this.commands.length; i++){
        console.log(this.commands[i])
        this.directions.push(this.commands[i]);
        console.log(this.directions)
        this.animation = true;
      }
    } else {
      this.onAlertMessage('"Selecione uma sequência antes de começar o jogo!!');
    }
  }

  stopAnimations() {
    this.animation = false;
  }

  resetOptionsSelect() {
    this.commands = [];
  }

  private resetSprite() {
    this.jogador.posicao.x = 100;
    this.jogador.posicao.y = 192;
    this.jogador.image = this.jogador.sprites.right;
  }

  async onAnimate() {

    window.requestAnimationFrame(() => this.onAnimate());

    this.background.draw(this.ctx);

    this.boundaries.forEach((item: Limite) => {
      item.draw(this.ctx);

    })
    this.jogador.draw(this.ctx);


    this.moedasFaseUm.forEach(value => {
      value.draw(this.ctx)
      value.moving = true
    })

    this.jogador.moving = false
    if (this.animation) {
      //  começar a movimentar o personagem na tela
      if (this.pixelMove === 32) {
        this.pixelMove = 0;
        if (this.directions.length === 0) {
          this.stopAnimations();
          //  verificado consição de parada do game
          if (this.moedasFaseUm.length > 0) {
            //  exibir modal-custom de perdeu  e tentar novamente
            this.stopAnimations();
            this.resetOptionsSelect();
            this.loadPlayer();
            this.loadMedals()
            this.onFailMessage();
          } else {
            if (this.fase < 3) {
              this.stopAnimations();
              this.onSucessMensage();
              this.resetOptionsSelect();
              this.loadPlayer();
              this.loadMedals();
              this.loadBackground();
              this.loadCollisions();

            }
          }
        } else {
          this.directions.splice(0, 1);
        }
      }
      console.log(this.moedasFaseUm.length)
      // detectando colisão enter as moedas e o sprite
      for(let i = 0; i < this.moedasFaseUm.length; i++){
        if (this.detectCollision(this.jogador, this.moedasFaseUm[i])) {
          this.moedasFaseUm.splice(i, 1);
        }
      }
      // detectando colisão entre as paredes
      this.boundaries.forEach((el: any) => {
        if (this.detectCollision(this.jogador, el)) {
          this.stopAnimations();
          this.resetOptionsSelect();
          this.loadPlayer();
          this.loadMedals();
          this.onFailMessage();
        }
      });
      // fazendo caminhos
      if (this.directions[0] === "right" && this.pixelMove <= 32) {
        this.jogador.posicao.x += 1;
        this.jogador.image = this.jogador.sprites.right;
        this.jogador.moving = true;
      }
      if (this.directions[0] === "left" && this.pixelMove <= 32) {
        this.jogador.posicao.x -= 1;
        this.jogador.image = this.jogador.sprites.left;
        this.jogador.moving = true;
      }
      if (this.directions[0] === "down" && this.pixelMove <= 32) {
        this.jogador.posicao.y += 1;
        this.jogador.image = this.jogador.sprites.bottom;
        this.jogador.moving = true;
      }
      if (this.directions[0] === "up" && this.pixelMove <= 32) {
        this.jogador.posicao.y -= 1;
        this.jogador.image = this.jogador.sprites.top;
        this.jogador.moving = true;
      }
      this.pixelMove += 1;
    }
  }

}
