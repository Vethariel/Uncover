import { level1 } from "../levels/level1.js"
import { LevelLoader } from "../world/levelLoader.js"
import { Enemy } from "../entities/enemy.js"
import { ENEMY_SIZE, ENEMY_SPEED, PLAYER_SIZE, PLAYER_SPEED, DIR_DOWN } from "../config/constants.js"
import { Player } from "../entities/player.js"

export class World {

  constructor(tileSize) {

    this.tileSize = tileSize

    this.grid = null

    this.entities = []
    this.player = null
    this.playerSpawn = null
    this.enemySpawns = []
    this.powerUps = {}

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
    this.powerUps = {}

    LevelLoader.load(this, level1)

    const spawn = this.playerSpawn

    const player = new Player(
      spawn.x * this.tileSize + (this.tileSize - PLAYER_SIZE) / 2,
      spawn.y * this.tileSize + (this.tileSize - PLAYER_SIZE) / 2,
      PLAYER_SPEED,
      PLAYER_SIZE,
      DIR_DOWN
    )

    this.player = player

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