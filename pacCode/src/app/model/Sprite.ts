import { Posicao } from './posicao';


export class Sprite {

  posicao!: Posicao;
  velocity?: number;
  image: HTMLImageElement;
  frames?: any;
  sprites?: any;
  largura!:number;
  altura!: number;
  moving?:boolean = false;

  constructor( posicao: Posicao, image: HTMLImageElement, velocity?: number,  frames = { max: 1 }, sprites?: any ) {
    this.posicao = posicao
    this.image = image
    this.frames = { ...frames, val: 0, elapsed: 0 }
    this.image.onload = () => {
      this.largura = this.image.width / this.frames.max
      this.altura = this.image.height
      // console.log(this.largura);
      // console.log(this.altura);
    }
    this.moving = false
    this.sprites = sprites
  }


  draw(d:any) {
    d.drawImage(
      this.image,
      this.frames.val * this.largura!,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.posicao.x,
      this.posicao.y,
      this.image.width / this.frames.max,
      this.image.height,
    )
    if (!this.moving) return
    if (this.frames.max > 1) {
      this.frames.elapsed++
    }
    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }

  }
}

