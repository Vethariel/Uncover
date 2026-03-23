import { TILE_WALL, TILE_DESTRUCTIBLE, TILE_EMPTY, TILE_EXPLOSION } from "../config/constants.js"

import { Explosion } from "../entities/explosion.js"

export class BombSystem {

  update(world, dt) {

    for (const bomb of world.bombs) {

      bomb.timer -= dt

      if (bomb.timer <= 0) {
        this.explode(world, bomb)
        continue
      }

      if (!bomb.passThrough) continue

      const player = bomb.owner

      if (player.tileX !== bomb.tileX || player.tileY !== bomb.tileY) {
        bomb.passThrough = false
      }

    }

    for (const explosion of world.explosions) {

      if (explosion.type !== "explosion") continue

      explosion.timer -= dt

      if (explosion.timer <= 0) {
        const grid = world.grid
        const tileX = explosion.tileX
        const tileY = explosion.tileY

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

    const tileX = bomb.tileX
    const tileY = bomb.tileY

    this.spawnExplosion(world, tileX, tileY)

    const range = bomb.bombRange || 1

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

    // Elimina power up vivo si lo hay
    const key = `${tx},${ty}`
    if (world.powerUps?.[key]?.alive) {
      delete world.powerUps[key]
    }

    world.explosions.push(new Explosion(tx, ty, world.tileSize))

  }

  triggerBomb(world, tx, ty) {

    for (const bomb of world.bombs) {

      if (bomb.tileX === tx && bomb.tileY === ty) {

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