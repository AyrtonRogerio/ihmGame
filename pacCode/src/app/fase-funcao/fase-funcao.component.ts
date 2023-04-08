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
@Component({
  selector: 'app-fase-funcao',
  templateUrl: './fase-funcao.component.html',
  styleUrls: ['./fase-funcao.component.scss']
})
export class FaseFuncaoComponent implements  OnInit{



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


  options: ItemDirecao[];
  option_function: ItemDirecao[]
  selected_normal: ItemDirecao[] = [];
  selected_function: ItemDirecao[] = [];

  fase = 2


  constructor(
    public dialog: MatDialog,
    private router: Router,

  ) {
    this.options = [
      new ItemDirecao("/assets/icons/Cima.svg", 'c'),
      new ItemDirecao("../../assets/icons/Baixo.svg", 'b'),
      new ItemDirecao("../../assets/icons/Esquerda.svg", 'e'),
      new ItemDirecao("../../assets/icons/Direita.svg", 'd'),
    ];
    this.option_function = [
      new ItemDirecao('assets/drag_drop/function.svg', 'f')
    ];
  }



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
  commandsFunction: string[] = [];
  commandSelected!: string;
  selectedImage!: string;

  addCommand(command: string): void {
    if(this.commandsFunction.length < 5){
      this.commandsFunction.push(command);
    } else if (this.commands.length < 5){
      this.commands.push(command);
      // this.commandSelected = command;
    } else {
      alert("Número máximo de comando atingido!!")
    }

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
      case 'f':
        return '../../assets/icons/funcao.png';
      default:
        return '';
    }
  }

  deleteLastCommand(): void {
    if(this.commands.length > 0){
      this.commands.pop();
    } else if(this.commandsFunction.length > 0){
      this.commandsFunction.pop();
    } else {
      alert("Nenhum comando para excluir!");
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

  loadCollisions() {
    const collisions = Colisao.loadColisao(2);

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
      image.src = "../../assets/pacCodeFase2Map.png"
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
    const moedasImage10 = new Image();
    const moedasImage11 = new Image();
    const moedasImage12 = new Image();

    moedasImage.src = '../../assets/moeda.png';
    moedasImage2.src = '../../assets/moeda.png';
    moedasImage3.src = '../../assets/moeda.png';
    moedasImage4.src = '../../assets/moeda.png';
    moedasImage5.src = '../../assets/moeda.png';
    moedasImage6.src = '../../assets/moeda.png';
    moedasImage7.src = '../../assets/moeda.png';
    moedasImage8.src = '../../assets/moeda.png';
    moedasImage9.src = '../../assets/moeda.png';
    moedasImage10.src = '../../assets/moeda.png';
    moedasImage11.src = '../../assets/moeda.png';
    moedasImage12.src = '../../assets/moeda.png';

    if (this.fase === 2) {
      this.moedasFaseUm = [
        new Sprite({x: 106, y: 330}, moedasImage, 0, {max: 1}),
        new Sprite({x: 106, y: 294}, moedasImage2, 0, {max: 1}),
        new Sprite({x: 138, y: 294}, moedasImage3, 0, {max: 1}),
        new Sprite({x: 164, y: 294}, moedasImage4, 0, {max: 1}),
        new Sprite({x: 164, y: 330}, moedasImage5, 0, {max: 1}),
        new Sprite({x: 196, y: 330}, moedasImage6, 0, {max: 1}),
        new Sprite({x: 234, y: 330}, moedasImage7, 0, {max: 1}),
        new Sprite({x: 234, y: 294}, moedasImage8, 0, {max: 1}),
        new Sprite({x: 264, y: 294}, moedasImage9, 0, {max: 1}),
        new Sprite({x: 296, y: 294}, moedasImage10, 0, {max: 1}),
        new Sprite({x: 296, y: 330}, moedasImage11, 0, {max: 1}),
        new Sprite({x: 328, y: 330}, moedasImage12, 0, {max: 1}),

      ]
    }
  }

  startAnimations() {

    if(this.commands.length > 0){
      for(let i = 0; i < this.commands.length; i++){
        console.log(this.commands[i])
        if(this.commands[i] === 'f'){
          for(let i = 0; i < this.commandsFunction.length; i++){
            this.directions.push(this.commandsFunction[i]);
          }
        }
        this.directions.push(this.commands[i]);
        console.log(this.directions)
        this.animation = true;
      }
    } else {
      alert("Selecione a sequência antes de começar o jogo")
    }

    // if (this.selected_normal.length > 0) {
    //   this.selected_normal.forEach(event => {
    //     if (event.key != 'f') {
    //       this.directions.push(event.key)
    //     } else {
    //       this.selected_function.forEach(value =>
    //         this.directions.push(value.key))
    //     }
    //   })
    //   if (this.directions.length > 0) {
    //     this.pointsPlayers += this.directions.length
    //     this.animation = true;
    //   } else {
    //     alert("Selecione a sequência antes de começar o jogo")
    //   }
    // }
  }

  stopAnimations() {
    this.animation = false;
  }

  resetOptionsSelect() {
    this.selected_function = [];
    this.selected_normal = [];
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
            this.showDialogResultEmitResulSession("Tente novamente :(", 1, false);
          } else {
            //  exibir modal-custom de sucesso e passar para a próxima fase
            console.log('entrou else')

            if (this.fase < 3) {
              console.log('entrou if dps do else')
              this.showDialogResultEmitResulSession("Vamos para a próxima fase.", 1, true);
              // this.fase += 1;
              this.stopAnimations();
              this.onSucessMensage();
              // this.resetOptionsSelect();
              // this.loadPlayer();
              // this.loadMedals();
              // this.loadBackground();
              // this.loadCollisions();

            } else {

              this.showDialogResultEmitResulSession("Você concluiu o jogo! Vá em histórico e veja sua classificação.", 1, true);
            }
          }
        } else {
          this.directions.splice(0, 1);
        }
      }
      console.log(this.moedasFaseUm.length)
      // detectando colisão enter as moedas e o sprite
      for(let i = 0; i < this.moedasFaseUm.length; i++){
        console.log('entrou for')
        if (this.detectCollision(this.jogador, this.moedasFaseUm[i])) {
          console.log('passou colisao moeda')
          this.moedasFaseUm.splice(i, 1);
        }
      }
      // this.moedasFaseUm.forEach(
      //   (moeda: Sprite, index: number) => {
      //     if (this.detectCollision(this.jogador, moeda)) {
      //       console.log('passou colisao moeda')
      //       this.moedasFaseUm.splice(index, 1);
      //     }
      //   }
      // )
      // detectando colisão entre as paredes
      this.boundaries.forEach((el: any) => {
        if (this.detectCollision(this.jogador, el)) {
          this.stopAnimations();
          this.resetOptionsSelect();
          this.loadPlayer();
          this.loadMedals()
          this.showDialogResultEmitResulSession("Tente novamente :(", 1, false);
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


  showDialogResultEmitResulSession(message: string, fase: number, status: boolean) {
    this.showDialogResult.emit({message: message, fase: fase, status: status})
  }

}
