export class Limite {


  largura = 32;
  altura = 32;
  posicao: any ;

  constructor(position: any) {
    this.posicao = position ;
    this.largura = 32;
    this.altura = 32;
  }

  draw(d: any) {
    d.fillStyle = 'transparent';
    d.fillRect(this.posicao.x, this.posicao.y, this.largura, this.altura);
  }

}
