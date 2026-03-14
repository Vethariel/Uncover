import { World } from "./world.js"
import { Player } from "../entities/player.js"

import { LevelLoader } from "../world/levelLoader.js"
import { level1 } from "../levels/level1.js"

import { Enemy } from "../entities/enemy.js"
import { EnemyAISystem } from "../systems/enemyAISystem.js"

import { InputSystem } from "../systems/inputSystem.js"
import { CollisionSystem } from "../systems/collisionSystem.js"
import { RenderSystem } from "../systems/renderSystem.js"
import { BombSystem } from "../systems/bombSystem.js"
import { LifeSystem } from "../systems/lifeSystem.js"

import { DIR_DOWN, PLAYER_SIZE, PLAYER_SPEED, TILE_SIZE, ENEMY_SIZE, ENEMY_SPEED } from "../config/constants.js"

export class Game {

    constructor() {

        this.world = new World(TILE_SIZE)

        LevelLoader.load(this.world, level1)

        const spawn = this.world.playerSpawn

        const player = new Player(
            spawn.x * this.world.tileSize + (this.world.tileSize - PLAYER_SIZE) / 2,
            spawn.y * this.world.tileSize + (this.world.tileSize - PLAYER_SIZE) / 2,
            PLAYER_SPEED,
            PLAYER_SIZE,
            DIR_DOWN
        )

        this.world.player = player
        this.world.entities.push(player)

        for (const spawn of this.world.enemySpawns) {
            const enemy = new Enemy(
                spawn.x * this.world.tileSize + (this.world.tileSize - ENEMY_SIZE) / 2,
                spawn.y * this.world.tileSize + (this.world.tileSize - ENEMY_SIZE) / 2,
                ENEMY_SPEED,
                ENEMY_SIZE
            )
            this.world.entities.push(enemy)
        }

        this.enemyAISystem = new EnemyAISystem()
        this.inputSystem = new InputSystem()
        this.collisionSystem = new CollisionSystem()
        this.renderSystem = new RenderSystem()
        this.bombSystem = new BombSystem()
        this.lifeSystem = new LifeSystem()

    }

    update(dt, p) {

        this.inputSystem.update(this.world, p)
        this.enemyAISystem.update(this.world, dt)
        this.collisionSystem.update(this.world, dt)
        this.bombSystem.update(this.world, dt)
        this.lifeSystem.update(this.world, dt)

    }

    render(p) {

        this.renderSystem.draw(this.world, p)

    }

}