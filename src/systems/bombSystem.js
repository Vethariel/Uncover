import { TILE_WALL, TILE_DESTRUCTIBLE, TILE_EMPTY, TILE_EXPLOSION } from "../config/constants.js"

import { Explosion } from "../entities/explosion.js"

export class BombSystem {

  update(world, dt) {

    const tileSize = world.tileSize

    for (const bomb of world.bombs) {

      bomb.timer -= dt

      if (bomb.timer <= 0) {
        this.explode(world, bomb)
        continue
      }

      if (!bomb.passThrough) continue

      const player = bomb.owner

      const playerTileX = Math.floor((player.posX + player.size / 2) / tileSize)
      const playerTileY = Math.floor((player.posY + player.size / 2) / tileSize)

      const bombTileX = Math.floor(bomb.posX / tileSize)
      const bombTileY = Math.floor(bomb.posY / tileSize)

      if (playerTileX !== bombTileX || playerTileY !== bombTileY) {
        bomb.passThrough = false
      }

    }

    for (const explosion of world.explosions) {

      if (explosion.type !== "explosion") continue

      explosion.timer -= dt

      if (explosion.timer <= 0) {
        const grid = world.grid
        const tileX = Math.floor(explosion.posX / tileSize)
        const tileY = Math.floor(explosion.posY / tileSize)

        if (grid.get(tileX, tileY) === TILE_EXPLOSION) {
          grid.set(tileX, tileY, TILE_EMPTY)
          this.revealPowerUp(world, tileX, tileY)
        }
      }

    }

    world.explosions = world.explosions.filter(
      explosion => explosion.timer > 0
    )

  }

  explode(world, bomb) {

    const grid = world.grid
    const tileSize = world.tileSize

    const tileX = Math.floor(bomb.posX / tileSize)
    const tileY = Math.floor(bomb.posY / tileSize)

    this.spawnExplosion(world, tileX, tileY)

    const range = bomb.owner.bombRange || 1

    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ]

    for (const dir of directions) {

      for (let i = 1; i <= range; i++) {

        const tx = tileX + dir.x * i
        const ty = tileY + dir.y * i

        const tile = grid.get(tx, ty)

        if (tile === TILE_WALL || tile === TILE_EXPLOSION)
          break

        this.spawnExplosion(world, tx, ty)

        if (tile === TILE_DESTRUCTIBLE) {

          grid.set(tx, ty, TILE_EXPLOSION)
          break

        }

        this.triggerBomb(world, tx, ty)

      }

    }

    const player = bomb.owner
    player.activeBombs--

    world.bombs = world.bombs.filter(b => b !== bomb)

  }

  spawnExplosion(world, tx, ty) {

    const tileSize = world.tileSize

    const x = tx * tileSize
    const y = ty * tileSize

    // Elimina power up vivo si lo hay
    const key = `${tx},${ty}`
    if (world.powerUps?.[key]?.alive) {
      delete world.powerUps[key]
    }

    world.explosions.push(new Explosion(x, y, tileSize))

  }

  triggerBomb(world, tx, ty) {

    const tileSize = world.tileSize

    for (const bomb of world.bombs) {

      const bx = Math.floor(bomb.posX / tileSize)
      const by = Math.floor(bomb.posY / tileSize)

      if (bx === tx && by === ty) {

        bomb.timer = 0

      }

    }

  }

  revealPowerUp(world, tx, ty) {

    const key = `${tx},${ty}`
    const powerUp = world.powerUps?.[key]

    if (powerUp) powerUp.alive = true

  }

}