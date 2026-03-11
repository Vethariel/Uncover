export class Player {

  constructor(posX, posY, speed, size, facing) {

    this.posX = posX
    this.posY = posY

    this.speed = speed
    this.size = size

    this.facing = facing
    this.desiredFacing = facing

    this.type = "player"  

    this.maxBombs = 2
    this.activeBombs = 0

    this.lives = 3
    this.alive = true

    this.invulnerableTimer = 0

  }

}