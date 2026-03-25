import {
  DIR_UP,
  DIR_DOWN,
  DIR_LEFT,
  DIR_RIGHT,
  DIR_NONE,
  TILE_PASS
} from "../config/constants.js"

import { Bomb } from "../entities/bomb.js"

export class InputSystem {

  update(world, inputHandler) {

    const player = world.player

    if (player.alive) {

      this.handlePlayerInput(world, player, inputHandler)

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

    if (inputHandler.isDown(' ')) {
      this.tryPlaceBomb(world, player)
    }
  }

  tryPlaceBomb(world, player) {

    if (player.activeBombs >= player.maxBombs)
      return

    const tileX = player.tileX
    const tileY = player.tileY

    if (world.grid.get( tileX, tileY ) === TILE_PASS)
      return

    if (this.bombExists(world, tileX, tileY))
      return

    const bomb = new Bomb(tileX, tileY, world.tileSize,player, player.bombRange)

    world.bombs.push(bomb)

    player.activeBombs++
  }

  bombExists(world, tileX, tileY) {

    for (const bomb of world.bombs) {

      if (bomb.tileX === tileX && bomb.tileY === tileY)
        return true
    }

    return false

  }

}