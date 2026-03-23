import { Blackboard }           from "../ai/blackboard.js"
import { createBasicEnemyTree } from "../ai/trees/basicEnemy.js"
import { DIR_DOWN } from "../config/constants.js"

export class Enemy {

    constructor(posX, posY, tileX, tileY, speed, size, tree = createBasicEnemyTree()) {

        this.posX = posX
        this.posY = posY

        this.tileX = tileX
        this.tileY = tileY

        this.speed = speed
        this.size = size

        this.facing = DIR_DOWN
        this.desiredFacing = DIR_DOWN
        this.currentDirection = DIR_DOWN
        
        this.behaviorTree = tree
        this.blackboard = new Blackboard()

        this.type = "enemy"

        this.alive = true
        this.invulnerableTimer = 0

        // IA
        this.thinkTimer = 0
        this.thinkInterval = 0.4  // recalcula dirección cada 400ms

    }

}