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

      const playerTileX = Math.floor((player.x + player.size / 2) / tileSize)
      const playerTileY = Math.floor((player.y + player.size / 2) / tileSize)

      const bombTileX = Math.floor(entity.posx / tileSize)
      const bombTileY = Math.floor(entity.posy / tileSize)

      if (playerTileX !== bombTileX || playerTileY !== bombTileY) {
        entity.passThrough = false
      }

    }

  }

  explode(world, bomb) {

    const player = bomb.owner

    player.activeBombs--

    world.entities = world.entities.filter(e => e !== bomb)

  }

}