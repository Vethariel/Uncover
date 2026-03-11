import { TILE_WALL, TILE_DESTRUCTIBLE, TILE_EMPTY, TILE_EXPLOSION } from "../config/constants.js"

import { Explosion } from "../entities/explosion.js"

export class BombSystem {

  update(world, dt) {

    const tileSize = world.tileSize

    for (const entity of world.entities) {

      if (entity.type !== "bomb") continue

      entity.timer -= dt

      if (entity.timer <= 0) {
        this.explode(world, entity)
        continue
      }

      if (!entity.passThrough) continue

      const player = entity.owner

      const playerTileX = Math.floor((player.posX + player.size / 2) / tileSize)
      const playerTileY = Math.floor((player.posY + player.size / 2) / tileSize)

      const bombTileX = Math.floor(entity.posX / tileSize)
      const bombTileY = Math.floor(entity.posY / tileSize)

      if (playerTileX !== bombTileX || playerTileY !== bombTileY) {
        entity.passThrough = false
      }

    }

    for (const e of world.entities) {

      if (e.type !== "explosion") continue

      e.timer -= dt

      if (e.timer <= 0) {
        const grid = world.grid
        const tileX = Math.floor(e.posX / tileSize)
        const tileY = Math.floor(e.posY / tileSize)

        if (grid.get(tileX, tileY) === TILE_EXPLOSION) {
          grid.set(tileX, tileY, TILE_EMPTY)
        }
      }

    }

    world.entities = world.entities.filter(
      e => e.type !== "explosion" || e.timer > 0
    )

  }

  explode(world, bomb) {

    const grid = world.grid
    const tileSize = world.tileSize

    const tileX = Math.floor(bomb.posX / tileSize)
    const tileY = Math.floor(bomb.posY / tileSize)

    this.spawnExplosion(world, tileX, tileY)

    const range = 3

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

    world.entities = world.entities.filter(e => e !== bomb)

  }

  spawnExplosion(world, tx, ty) {

    const tileSize = world.tileSize

    const x = tx * tileSize
    const y = ty * tileSize

    world.entities.push(new Explosion(x, y, tileSize))

  }

  triggerBomb(world, tx, ty) {

    const tileSize = world.tileSize

    for (const e of world.entities) {

      if (e.type !== "bomb") continue

      const bx = Math.floor(e.posX / tileSize)
      const by = Math.floor(e.posY / tileSize)

      if (bx === tx && by === ty) {

        e.timer = 0

      }

    }

  }

}