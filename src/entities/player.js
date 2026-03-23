export class Player {

  constructor(posX, posY, tileX, tileY, speed, size, facing) {

    this.posX = posX
    this.posY = posY
    
    this.tileX = tileX
    this.tileY = tileY

    this.speed = speed
    this.size = size

    this.facing = facing
    this.desiredFacing = facing

    this.type = "player"  

    this.maxBombs = 1
    this.activeBombs = 0
    this.bombRange = 1

    this.lives = 3
    this.alive = true

    this.invulnerableTimer = 0

  }

}