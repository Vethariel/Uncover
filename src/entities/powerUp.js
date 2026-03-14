export class PowerUp {

    constructor(posX, posY, size, kind) {

        this.posX = posX
        this.posY = posY
        this.size = size
        this.kind = kind   // "life" | "bomb" | "range" | "speed"

        this.type = "powerup"
        this.alive = false

    }

}