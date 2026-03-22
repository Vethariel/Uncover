import { BTNode, BT_SUCCESS, BT_FAILURE } from "../behaviorTree.js"

export class IsPlayerNear extends BTNode {

    constructor(radius = 4) {
        super()
        this.radius = radius
    }

    tick(enemy, world) {

        if (!world.player?.alive) return BT_FAILURE

        const ts     = world.tileSize
        const tileX  = Math.floor((enemy.posX  + enemy.size  / 2) / ts)
        const tileY  = Math.floor((enemy.posY  + enemy.size  / 2) / ts)
        const playerX = Math.floor((world.player.posX + world.player.size / 2) / ts)
        const playerY = Math.floor((world.player.posY + world.player.size / 2) / ts)

        const dist = Math.abs(playerX - tileX) + Math.abs(playerY - tileY)
        return dist <= this.radius ? BT_SUCCESS : BT_FAILURE

    }

}