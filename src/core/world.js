import { TILE_SIZE } from "../config/constants.js"

export class World {

  constructor() {

    this.tileSize = TILE_SIZE

    this.grid = null

    this.entities = []
    this.player = null
    this.playerSpawn = null

  }

}