import { World } from "../core/world.js"
import { EnemyAISystem } from "../systems/enemyAISystem.js"
import { InputSystem } from "../systems/inputSystem.js"
import { CollisionSystem } from "../systems/collisionSystem.js"
import { RenderSystem } from "../systems/renderSystem.js"
import { BombSystem } from "../systems/bombSystem.js"
import { LifeSystem } from "../systems/lifeSystem.js"
import { PowerUpSystem } from "../systems/powerUpSystem.js"

import {
    TILE_SIZE
} from "../config/constants.js"

export class GameplayScene {

    constructor(gameState) {

        this.gameState = gameState

        // Sistemas se crean una vez y se reutilizan
        this.enemyAISystem = new EnemyAISystem()
        this.inputSystem = new InputSystem()
        this.collisionSystem = new CollisionSystem()
        this.renderSystem = new RenderSystem()
        this.bombSystem = new BombSystem()
        this.lifeSystem = new LifeSystem()
        this.powerUpSystem = new PowerUpSystem()

        this.world = null

    }

    onEnter() {

        // Crea el mundo con el nivel correcto según gameState
        this.world = new World(TILE_SIZE)
        // reset carga el nivel, spawns de jugador, enemigos y portal
        this.world.currentLevelIndex = this.gameState.currentLevelIndex
        this.world.reset()
        this.gameState.applyToPlayer(this.world.player)

    }
    onExit() {
        this.gameState.syncFromPlayer(this.world.player)
    }

    update(dt, p) {

        if (!this.world) return

        this.inputSystem.update(this.world, this.inputHandler)
        this.enemyAISystem.update(this.world, dt)
        this.collisionSystem.update(this.world, dt)
        this.bombSystem.update(this.world, dt)
        this.lifeSystem.update(this.world, dt)
        this.powerUpSystem.update(this.world, dt)

        this._handleTransitions()

    }

    render(buffer) {
        if (!this.world) return
        this.renderSystem.draw(this.world, buffer)

    }

    _handleTransitions() {

        if (this.world.gameOver) {
            this.gameState.syncFromPlayer(this.world.player)
            this.manager.transition('gameOver')
            return
        }

        if (this.world.gameWon) {
            this.gameState.syncFromPlayer(this.world.player)
            this.gameState.nextLevel()
            this.gameState.save()
            this.manager.showOverlay('victory')
            this.world.gameWon = false
        }

    }

}