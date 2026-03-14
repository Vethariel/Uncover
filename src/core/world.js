import { LEVELS } from "../levels/levels.js"
import { LevelLoader } from "../world/levelLoader.js"
import { Enemy } from "../entities/enemy.js"
import { ENEMY_SIZE, ENEMY_SPEED, PLAYER_SIZE, PLAYER_SPEED, DIR_DOWN } from "../config/constants.js"
import { Player } from "../entities/player.js"
import { Portal } from "../entities/portal.js"

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

    this.currentLevelIndex = 0
    this.portal = null

  }

  reset() {

    this.entities = []
    this.bombs = []

    this.gameOver = false
    this.gameWon = false

    this.portal = null

    this.enemySpawns = []
    this.powerUps = {}
    this.currentLevelIndex = 0

    LevelLoader.load(this, LEVELS[this.currentLevelIndex])

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

    this.spawnPortal()

  }

  spawnPortal() {

    if (!this.portalSpawn) return

    const ts = this.tileSize
    const portal = new Portal(
      this.portalSpawn.x * ts,
      this.portalSpawn.y * ts,
      ts
    )

    this.portal = portal

  }

  loadNextLevel() {

    this.currentLevelIndex++
    this.enemySpawns = []
    this.powerUps = {}
    this.portal = null

    LevelLoader.load(this, LEVELS[this.currentLevelIndex])

    // Reposiciona player
    this.player.posX = this.playerSpawn.x * this.tileSize + (this.tileSize - this.player.size) / 2
    this.player.posY = this.playerSpawn.y * this.tileSize + (this.tileSize - this.player.size) / 2

    // Respawnea enemigos
    for (const spawn of this.enemySpawns) {
      const enemy = new Enemy(
        spawn.x * this.tileSize + (this.tileSize - ENEMY_SIZE) / 2,
        spawn.y * this.tileSize + (this.tileSize - ENEMY_SIZE) / 2,
        ENEMY_SPEED,
        ENEMY_SIZE
      )
      this.entities.push(enemy)
    }

    this.spawnPortal()

  }

  isLastLevel() {
    return this.currentLevelIndex >= LEVELS.length - 1
  }

}