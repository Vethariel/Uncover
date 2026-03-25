import { World } from "../core/world.js"
import { EnemyAISystem } from "../systems/enemyAISystem.js"
import { InputSystem } from "../systems/inputSystem.js"
import { CollisionSystem } from "../systems/collisionSystem.js"
import { RenderSystem } from "../systems/renderSystem.js"
import { BombSystem } from "../systems/bombSystem.js"
import { LifeSystem } from "../systems/lifeSystem.js"
import { PowerUpSystem } from "../systems/powerUpSystem.js"

import { AssetManager } from "../core/assetManager.js"
import { AnimationSystem } from "../systems/animationSystem.js"

import { LEVELS } from "../levels/levels.js"

import { TILE_SIZE } from "../config/constants.js"

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

        this.assets = new AssetManager()
        this.animationSystem = new AnimationSystem()

        this.world = null

    }

    async preload(p) {
        await this.assets.loadSheet('player', 'assets/sprites/player.png', p)
        await this.assets.loadSheet('enemy', 'assets/sprites/enemy.png', p)
        await this.assets.loadSheet('bombs', 'assets/sprites/bomb.png', p)
        await this.assets.loadSheet('powerUp', 'assets/sprites/powerUp.png', p)

        for (const level of LEVELS.filter(l => l.type === "tmj")) {
            await this.assets.loadTMJ(level.data, `assets/tilemaps/${level.data}.tmj`)
             // { firstgid, source }
            const tsKey = level.data                     // ej. "level1"
            const tsPath = `assets/tilemaps/${tsKey}.tsj` // misma carpeta

            await this.assets.loadTSJ(tsKey, tsPath)

            const tsj = this.assets.getTSJ(tsKey)
            await this.assets.loadSheet(tsKey, `assets/tilemaps/${tsj.image}`, p)
        }
    }

    onEnter() {

        // Crea el mundo con el nivel correcto según gameState
        this.world = new World(TILE_SIZE)
        // reset carga el nivel, spawns de jugador, enemigos y portal
        this.world.currentLevelIndex = this.gameState.currentLevelIndex
        this.world.reset(this.assets)
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
        this.animationSystem.update(this.world, dt)

        this._handleTransitions()

    }

    render(buffer) {
        if (!this.world) return
        this.renderSystem.draw(this.world, this.assets, buffer)

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