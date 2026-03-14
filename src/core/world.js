import { level1 } from "../levels/level1.js"
import { LevelLoader } from "../world/levelLoader.js"
import { Enemy } from "../entities/enemy.js"
import { ENEMY_SIZE, ENEMY_SPEED } from "../config/constants.js"

export class World {

  constructor(tileSize) {

    this.tileSize = tileSize

    this.grid = null

    this.entities = []
    this.player = null
    this.playerSpawn = null
    this.enemySpawns = []

    this.gameOver = false
    this.respawnTimer = 0

    this.gameWon = false

  }

  reset() {

    this.entities = []
    this.bombs = []

    this.gameOver = false
    this.gameWon = false

    this.enemySpawns = []

    LevelLoader.load(this, level1)

    this.player.posX = this.playerSpawn.x * this.tileSize + (this.tileSize - this.player.size) / 2
    this.player.posY = this.playerSpawn.y * this.tileSize + (this.tileSize - this.player.size) / 2
    this.player.lives = 3
    this.player.alive = true

    this.entities.push(this.player)

    for (const spawn of this.enemySpawns) {
      const enemy = new Enemy(
        spawn.x * this.tileSize + (this.tileSize - ENEMY_SIZE) / 2,
        spawn.y * this.tileSize + (this.tileSize - ENEMY_SIZE) / 2,
        ENEMY_SPEED,
        ENEMY_SIZE
      )

      this.entities.push(enemy)

    }

  }
}