export class Explosion {

  constructor(tileX, tileY, size, timer = 0.3) {

    this.tileX = tileX
    this.tileY = tileY

    this.size = size
    this.posX = this.tileX * this.size
    this.posY = this.tileY * this.size

    this.timer = timer

    this.type = "explosion"

  }

}