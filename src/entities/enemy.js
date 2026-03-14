import { DIR_DOWN } from "../config/constants.js"

export class Enemy {

    constructor(posX, posY, speed, size) {

        this.posX = posX
        this.posY = posY

        this.speed = speed
        this.size = size

        this.facing = DIR_DOWN
        this.desiredFacing = DIR_DOWN

        this.type = "enemy"

        this.alive = true
        this.invulnerableTimer = 0

        // IA
        this.thinkTimer = 0
        this.thinkInterval = 0.4  // recalcula dirección cada 400ms
        this.currentDirection = DIR_DOWN

    }

}