export class Player {

  constructor(x, y, speed, size, facing) {

    this.x = x
    this.y = y

    this.speed = speed
    this.size = size

    this.facing = facing
    this.desiredFacing = facing

    this.type = "player"  

    this.maxBombs = 2
    this.activeBombs = 0

  }

}