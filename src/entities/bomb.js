export class Bomb {

    constructor(posX, posY, size, owner, timer = 2.5) {

        this.posX = posX
        this.posY = posY

        this.size = size

        this.timer = timer

        this.owner = owner

        this.passThrough = true

        this.type = "bomb"

    }

}