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

  pointsPlayers = 0;


  options: ItemDirecao[];
  option_function: ItemDirecao[]
  selected_normal: ItemDirecao[] = [];
  selected_function: ItemDirecao[] = [];

  fase = 1


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

    // this.loadPlayer();

    // this.loadMedals()

    this.onAnimate();
  }

  commands: string[] = [];
  commandSelected!: string;
  selectedImage!: string;

  addCommand(command: string): void {
    if(this.commands.length < 8){
      this.commands.push(command);
      this.commandSelected = command;
    } else {
      alert("Número máximo de comando atingido!!")
    }

  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.commands, event.previousIndex, event.currentIndex);
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
    this.commands.pop();
  }

  executeCommands(): void {
    let currentIndex = 0;

    const executeNextCommand = () => {
      if (currentIndex < this.commands.length) {
        const command = this.commands[currentIndex];

        switch (command) {
          // case 'moveUp':
          //   this.moveUp();
          //   break;
          // case 'moveDown':
          //   this.moveDown();
          //   break;
          // case 'moveLeft':
          //   this.moveLeft();
          //   break;
          // case 'moveRight':
          //   this.moveRight();
          //   break;
          default:
            console.log(`Unknown command: ${command}`);
        }

        currentIndex++;
        setTimeout(executeNextCommand, 500);
      }
    };

    executeNextCommand();
  }

  loadCollisions() {
    const collisions = Colisao.loadColisao(this.fase);

    for (let i = 0; i < collisions.length; i += 20) {
      // @ts-ignore
      this.collisionsMap.push(collisions.slice(i, 20 + i));
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
    playerDownImage.src = '../../assets/playerDown.png';
    const playerUpImage = new Image();
    playerUpImage.src = '../../assets/playerUp.png';
    const playerLeftImage = new Image();
    playerLeftImage.src = '../../assets/playerLeft.png';
    const playerRightImage = new Image();
    playerRightImage.src = '../../assets/playerRight.png';

    let p = new Posicao(100, 192)
    if (this.fase === 2) {
      p = new Posicao(326, 160)
    }
    if (this.fase === 3) {
      p = new Posicao(68, 224)
    }


    this.jogador = new Sprite(p,
      playerDownImage,
      0,
      {max: 4},
      {
        top: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        bottom: playerDownImage
      }
    );

  }


  detectCollision(rect1: Sprite, rect2: any) {

    return (rect1.posicao.x < rect2.position.x + rect2.width &&
      rect1.posicao.x + rect1.largura > rect2.position.x &&
      rect1.posicao.y < rect2.position.y + rect2.height &&
      rect1.posicao.y + rect1.altura > rect2.position.y)
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

    moedasImage.src = '../../assets/moedas.png';
    moedasImage2.src = '../../assets/moedas.png';
    moedasImage3.src = '../../assets/moedas.png';
    moedasImage4.src = '../../assets/moedas.png';
    moedasImage5.src = '../../assets/moedas.png';
    moedasImage6.src = '../../assets/moedas.png';
    moedasImage7.src = '../../assets/moedas.png';
    moedasImage8.src = '../../assets/moedas.png';
    moedasImage9.src = '../../assets/moedas.png';

    if (this.fase === 1) {
      this.moedasFaseUm = [
        new Sprite({x: 168, y: 200}, moedasImage, 0, {max: 10}),
        new Sprite({x: 200, y: 200}, moedasImage3, 0, {max: 10}),
        new Sprite({x: 200, y: 234}, moedasImage2, 0, {max: 10}),
      ]
    }
    if (this.fase === 2) {
      this.moedasFaseUm = [
        new Sprite({x: 168, y: 200}, moedasImage, 0, {max: 10}),
        new Sprite({x: 200, y: 234}, moedasImage2, 0, {max: 10}),
        new Sprite({x: 232, y: 234}, moedasImage3, 0, {max: 10}),
        new Sprite({x: 266, y: 234}, moedasImage4, 0, {max: 10}),
        new Sprite({x: 298, y: 234}, moedasImage5, 0, {max: 10}),
        new Sprite({x: 328, y: 200}, moedasImage6, 0, {max: 10}),
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

    if (this.selected_normal.length > 0) {
      this.selected_normal.forEach(event => {
        if (event.key != 'f') {
          this.directions.push(event.key)
        } else {
          this.selected_function.forEach(value =>
            this.directions.push(value.key))
        }
      })
      if (this.directions.length > 0) {
        this.pointsPlayers += this.directions.length
        this.animation = true;
      } else {
        alert("Selecione a sequência antes de começar o jogo")
      }
    }
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
    this.jogador.image = this.jogador.sprites.bottom;
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
            if (this.fase < 3) {
              this.showDialogResultEmitResulSession("Vamos para a próxima fase.", 1, true);
              this.fase += 1;
              this.stopAnimations();
              this.resetOptionsSelect();
              this.loadPlayer();
              this.loadMedals();
              this.loadBackground();
              this.loadCollisions();

            } else {

              this.router.navigate(['/app/ranking']);
              this.showDialogResultEmitResulSession("Você concluiu o jogo! Vá em histórico e veja sua classificação.", 1, true);
            }
          }
        } else {
          this.directions.splice(0, 1);
        }
      }

      // detectando colisão enter as moedas e o sprite
      this.moedasFaseUm.forEach(
        (moeda: Sprite, index: number) => {
          if (this.detectCollision(this.jogador, moeda)) {
            this.moedasFaseUm.splice(index, 1);
          }
        }
      )
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
      if (this.directions[0] === "d" && this.pixelMove <= 32) {
        this.jogador.posicao.x += 1;
        this.jogador.image = this.jogador.sprites.right;
        this.jogador.moving = true;
      }
      if (this.directions[0] === "e" && this.pixelMove <= 32) {
        this.jogador.posicao.x -= 1;
        this.jogador.image = this.jogador.sprites.left;
        this.jogador.moving = true;
      }
      if (this.directions[0] === "b" && this.pixelMove <= 32) {
        this.jogador.posicao.y += 1;
        this.jogador.image = this.jogador.sprites.bottom;
        this.jogador.moving = true;
      }
      if (this.directions[0] === "c" && this.pixelMove <= 32) {
        this.jogador.posicao.y -= 1;
        this.jogador.image = this.jogador.sprites.top;
        this.jogador.moving = true;
      }
      this.pixelMove += 1;
    }
  }

  onCloneCommand(index: number) {
    const clonedItem = Object.assign({}, this.selected_normal[index]);
    this.selected_normal.splice(index + 1, 0, clonedItem);
  }

  dropOptionElementNormal(event: CdkDragDrop<ItemDirecao[]>) {
    if (this.selected_normal.length <= 8)
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
  }


  dropOptionElementFunction(event: CdkDragDrop<ItemDirecao[]>) {
    var add = true;
    event.previousContainer.data.forEach((e: ItemDirecao) => {
      if (e.key === 'f') add = false;
    })
    if (this.selected_function.length <= 6 && add)
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
  }


  showDialogResultEmitResulSession(message: string, fase: number, status: boolean) {
    this.showDialogResult.emit({message: message, fase: fase, status: status})
  }


  onRemoveItemListNormal(i: number) {
    this.selected_normal.splice(i, 1);

  }

  onRemoveItemListFunction(j: number) {
    this.selected_function.splice(j, 1);
  }

}
