import {
  DIR_UP,
  DIR_DOWN,
  DIR_LEFT,
  DIR_RIGHT,
  DIR_NONE
} from "../config/constants.js"

import { Bomb } from "../entities/bomb.js"

export class InputSystem {

  update(world, p) {

    const player = world.player

    if (player.alive) {

      this.handlePlayerInput(world, player, p)

    }

    if (world.gameOver && p.keyIsDown('r')) {

      world.reset()

    }

  }

  handlePlayerInput(world, player, p) {
    let direction = DIR_NONE

    if (p.keyIsDown('a')) direction = DIR_LEFT   // A
    else if (p.keyIsDown('d')) direction = DIR_RIGHT    // D
    else if (p.keyIsDown('w')) direction = DIR_UP   // W
    else if (p.keyIsDown('s')) direction = DIR_DOWN    // S

    player.facing = direction == DIR_NONE ? player.facing : direction
    player.desiredFacing = direction

    if (p.keyIsDown(' ')) {
      this.tryPlaceBomb(world, player)
    }
  }

  tryPlaceBomb(world, player) {

    const tileSize = world.tileSize

    if (player.activeBombs >= player.maxBombs)
      return

    const tileX = Math.floor((player.posX + player.size / 2) / tileSize)
    const tileY = Math.floor((player.posY + player.size / 2) / tileSize)

    if (this.bombExists(world, tileX, tileY))
      return

    const bombX = tileX * tileSize
    const bombY = tileY * tileSize

    const bomb = new Bomb(bombX, bombY, tileSize, player)

    world.entities.push(bomb)

    player.activeBombs++
  }

  bombExists(world, tileX, tileY) {

    const tileSize = world.tileSize

    for (const entity of world.entities) {

      if (entity.type !== "bomb") continue

      const bx = Math.floor(entity.posX / tileSize)
      const by = Math.floor(entity.posY / tileSize)

      if (bx === tileX && by === tileY)
        return true
    }

    return false

  }

}