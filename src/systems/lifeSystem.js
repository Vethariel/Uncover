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

        const entities = [world.player, ...world.enemies]

        for (const entity of entities) {

            if (!entity.alive) continue
            if (entity.invulnerableTimer > 0) continue  // por si añades invulnerabilidad a enemigos

            const tileX = Math.floor((entity.posX + entity.size / 2) / tileSize)
            const tileY = Math.floor((entity.posY + entity.size / 2) / tileSize)

            for (const explosion of world.explosions) {

                const ex = Math.floor(explosion.posX / tileSize)
                const ey = Math.floor(explosion.posY / tileSize)

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

            for (const enemy of world.enemies) {

                if (this.overlaps(player, enemy)) {
                    this.killPlayer(world)
                    break
                }

            }

        }

        if (player.invulnerableTimer > 0) player.invulnerableTimer -= dt

        // Condición de victoria
        const enemiesAlive = world.enemies.some(e => e.alive)

        // Activa portal cuando no quedan enemigos
        if (!enemiesAlive && world.portal) {
            world.portal.active = true
        }

        // Chequea si el jugador toca el portal activo
        if (world.portal?.active && world.player.alive) {
            if (this.overlaps(world.player, world.portal)) {
                world.gameWon = true
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

    killEnemy(world, enemy) {

        enemy.alive = false
        world.enemies = world.enemies.filter(e => e !== enemy)

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