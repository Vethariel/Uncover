// ai/actions/chasePlayer.js
import { BTNode, BT_FAILURE, BT_RUNNING } from "../behaviorTree.js"
import { bfsToTarget } from "../helpers/bfsHelper.js"

export class ChasePlayer extends BTNode {

    tick(enemy, world) {

        if (!world.player?.alive) return BT_FAILURE

        const ts     = world.tileSize
        const startX = Math.floor((enemy.posX  + enemy.size  / 2) / ts)
        const startY = Math.floor((enemy.posY  + enemy.size  / 2) / ts)
        const goalX  = Math.floor((world.player.posX + world.player.size / 2) / ts)
        const goalY  = Math.floor((world.player.posY + world.player.size / 2) / ts)

        // BFS evitando tiles peligrosos
        const dir = bfsToTarget(world, startX, startY, goalX, goalY, true)

        if (!dir) return BT_FAILURE

        enemy.currentDirection = dir
        enemy.desiredFacing    = dir

        return BT_RUNNING

    }

}