export class Bomb {

    constructor(x, y, size, owner, timer = 2.5) {

        this.posx = x
        this.posy = y

        this.size = size

        this.timer = timer

        this.owner = owner

        this.passThrough = true

        this.type = "bomb"

    }

}