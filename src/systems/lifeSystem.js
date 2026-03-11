export class LifeSystem {

    update(world, dt) {

        const tileSize = world.tileSize
        const player = world.player

        if (!player.alive && !world.gameOver) {

            world.respawnTimer -= dt

            if (world.respawnTimer <= 0) {

                if (player.lives > 0)
                    this.respawn(world)
                else
                    world.gameOver = true
            }

            return

        }

        const playerTileX = Math.floor((player.posX + player.size / 2) / tileSize)
        const playerTileY = Math.floor((player.posY + player.size / 2) / tileSize)

        for (const e of world.entities) {

            if (e.type !== "explosion") continue

            const ex = Math.floor(e.posX / tileSize)
            const ey = Math.floor(e.posY / tileSize)

            if (ex === playerTileX && ey === playerTileY) {

                this.killPlayer(world)

            }

        }

    }

    killPlayer(world) {

        const player = world.player

        if (!player.alive) return

        player.lives--
        player.alive = false

        world.respawnTimer = 2

    }

    respawn(world) {

        const player = world.player
        const spawn = world.playerSpawn
        const tileSize = world.tileSize

        player.posX = spawn.x * tileSize + (tileSize - player.size) / 2,
        player.posY = spawn.y * tileSize + (tileSize - player.size) / 2

        player.alive = true

    }

}