import {
  DIR_UP,
  DIR_DOWN,
  DIR_LEFT,
  DIR_RIGHT,
  DIR_NONE
} from "../config/constants.js"

import { Bomb } from "../entities/bomb.js"

export class InputSystem {

  update(world, inputHandler) {

    const player = world.player

    if (player.alive) {

      this.handlePlayerInput(world, player, inputHandler)

    }

    if ((world.gameOver || world.gameWon) && inputHandler.isJustDown('r')) {

      world.reset()

    }

  }

  handlePlayerInput(world, player, inputHandler) {
    let direction = DIR_NONE

    if (inputHandler.isDown('a')) direction = DIR_LEFT   // A
    else if (inputHandler.isDown('d')) direction = DIR_RIGHT    // D
    else if (inputHandler.isDown('w')) direction = DIR_UP   // W
    else if (inputHandler.isDown('s')) direction = DIR_DOWN    // S

    player.facing = direction == DIR_NONE ? player.facing : direction
    player.desiredFacing = direction

    if (inputHandler.isJustDown(' ')) {
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

    world.bombs.push(bomb)

    player.activeBombs++
  }

  bombExists(world, tileX, tileY) {

    const tileSize = world.tileSize

    for (const bomb of world.bombs) {

      const bx = Math.floor(bomb.posX / tileSize)
      const by = Math.floor(bomb.posY / tileSize)

      if (bx === tileX && by === tileY)
        return true
    }

    return false

  }

}