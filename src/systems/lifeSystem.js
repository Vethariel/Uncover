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

        for (const entity of world.entities) {

            if (entity.type !== "player" && entity.type !== "enemy") continue
            if (!entity.alive) continue
            if (entity.invulnerableTimer > 0) continue  // por si añades invulnerabilidad a enemigos

            const tileX = Math.floor((entity.posX + entity.size / 2) / tileSize)
            const tileY = Math.floor((entity.posY + entity.size / 2) / tileSize)

            for (const e of world.entities) {

                if (e.type !== "explosion") continue

                const ex = Math.floor(e.posX / tileSize)
                const ey = Math.floor(e.posY / tileSize)

                if (ex === tileX && ey === tileY) {

                    if (entity.type === "player")
                        this.killPlayer(world)
                    else
                        this.killEnemy(world, entity)

                }

            }

        }

        // Después del loop de explosiones, antes de la condición de victoria:
        if (player.alive && player.invulnerableTimer <= 0) {

            for (const entity of world.entities) {

                if (entity.type !== "enemy" || !entity.alive) continue

                if (this.overlaps(player, entity)) {
                    this.killPlayer(world)
                    break
                }

            }

        }

        if (player.invulnerableTimer > 0) player.invulnerableTimer -= dt

        // Condición de victoria
        const enemiesAlive = world.entities.some(e => e.type === "enemy" && e.alive)

        if (!enemiesAlive && !world.gameOver) {
            world.gameWon = true
        }

    }

    killPlayer(world) {

        const player = world.player

        if (!player.alive) return

        player.lives--
        player.alive = false

        world.respawnTimer = 2

    }

    killEnemy(world, enemy) {

        enemy.alive = false
        world.entities = world.entities.filter(e => e !== enemy)

    }

    respawn(world) {

        const player = world.player
        const spawn = world.playerSpawn
        const tileSize = world.tileSize

        player.posX = spawn.x * tileSize + (tileSize - player.size) / 2
        player.posY = spawn.y * tileSize + (tileSize - player.size) / 2

        player.alive = true
        player.invulnerableTimer = 2  // 2 segundos de invulnerabilidad

    }

    overlaps(a, b) {
        return (
            a.posX < b.posX + b.size &&
            a.posX + a.size > b.posX &&
            a.posY < b.posY + b.size &&
            a.posY + a.size > b.posY
        )
    }

}