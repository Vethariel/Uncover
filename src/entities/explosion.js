export class Explosion {

  constructor(posX, posY, size, timer = 0.3) {

    this.posX = posX
    this.posY = posY

    this.size = size

    this.timer = timer

    this.type = "explosion"

  }

}