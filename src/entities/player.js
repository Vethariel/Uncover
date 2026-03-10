import { PLAYER_SPEED, PLAYER_SIZE, DIR_NONE } from "../config/constants.js"

export class Player {

  constructor(x, y) {

    this.x = x
    this.y = y

    
    this.vx = 0
    this.vy = 0
    
    this.speed = PLAYER_SPEED
    this.size = PLAYER_SIZE

    this.facing = DIR_NONE

  }

}