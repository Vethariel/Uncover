import { LEVELS } from "../levels/levels.js"
import { LevelLoader } from "../world/levelLoader.js"
import { Enemy } from "../entities/enemy.js"
import { Player } from "../entities/player.js"
import { Portal } from "../entities/portal.js"
import { ENEMY_SIZE, ENEMY_SPEED, PLAYER_SIZE, PLAYER_SPEED, DIR_DOWN } from "../config/constants.js"

export class World {

  constructor(tileSize) {

    this.tileSize = tileSize
    this.grid = null
    this.player = null
    this.enemies = []
    this.bombs = []
    this.explosions = []
    this.playerSpawn = null
    this.portalSpawn = null
    this.enemySpawns = []
    this.powerUps = {}
    this.portal = null

    this.currentLevelIndex = 0
    
    this.gameOver = false
    this.gameWon = false
    this.respawnTimer = 0
  }

  reset() {

    this.grid = null
    this.player = null
    this.enemies = []
    this.explosions = []
    this.playerSpawn = null
    this.portalSpawn = null
    this.bombs = []

    this.gameOver = false
    this.gameWon = false

    this.portal = null

    this.enemySpawns = []
    this.powerUps = {}

    LevelLoader.load(this, LEVELS[this.currentLevelIndex])

    const spawn = this.playerSpawn

    const player = new Player(
      spawn.x * this.tileSize + (this.tileSize - PLAYER_SIZE) / 2,
      spawn.y * this.tileSize + (this.tileSize - PLAYER_SIZE) / 2,
      spawn.x,
      spawn.y,
      PLAYER_SPEED,
      PLAYER_SIZE,
      DIR_DOWN
    )

    this.player = player

    for (const spawn of this.enemySpawns) {
      const enemy = new Enemy(
        spawn.x * this.tileSize + (this.tileSize - ENEMY_SIZE) / 2,
        spawn.y * this.tileSize + (this.tileSize - ENEMY_SIZE) / 2,
        spawn.x,
        spawn.y,
        ENEMY_SPEED,
        ENEMY_SIZE
      )

      this.enemies.push(enemy)

    }

    this.spawnPortal()

  }

  spawnPortal() {

    if (!this.portalSpawn) return
    
    const portal = new Portal(
      this.portalSpawn.x,
      this.portalSpawn.y,
      this.tileSize
    )

    this.portal = portal

  }

  isLastLevel() {
    return this.currentLevelIndex >= LEVELS.length - 1
  }

}