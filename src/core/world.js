import { level1 } from "../levels/level1.js"
import { LevelLoader } from "../world/levelLoader.js"

export class World {

  constructor(tileSize) {

    this.tileSize = tileSize

    this.grid = null

    this.entities = []
    this.player = null
    this.playerSpawn = null

    this.gameOver = false
    this.respawnTimer = 0

  }

  reset() {

    this.entities = []
    this.bombs = []

    this.gameOver = false

    LevelLoader.load(this, level1)

    this.player.posX = this.playerSpawn.x * this.tileSize + (this.tileSize - this.player.size) / 2
    this.player.posY = this.playerSpawn.y * this.tileSize + (this.tileSize - this.player.size) / 2
    this.player.lives = 3
    this.player.alive = true

    this.entities.push(this.player)

  }

}