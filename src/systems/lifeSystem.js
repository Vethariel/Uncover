export class LifeSystem {

    update(world, dt) {
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

            for (const explosion of world.explosions) {

                if (explosion.tileX === entity.tileX && explosion.tileY === entity.tileY) {

                    if (entity.type === "player")
                        this.killPlayer(world)
                    else
                        this.killEnemy(world, entity)

                }

            }

        }

        for (const enemy of world.enemies) {
            if (!enemy.alive) {
                enemy.deathTimer -= dt
            }
        }
        world.enemies = world.enemies.filter(e => e.alive || e.deathTimer > 0)

        // Después del loop de explosiones, antes de la condición de victoria:
        if (player.alive && player.invulnerableTimer <= 0) {

            for (const enemy of world.enemies) {

                if (enemy.alive && this.overlaps(player, enemy)) {
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
        enemy.deathTimer = 1

    }

    respawn(world) {

        const player = world.player
        const spawn = world.playerSpawn
        const tileSize = world.tileSize

        player.posX = spawn.x * tileSize + (tileSize - player.size) / 2
        player.posY = spawn.y * tileSize + (tileSize - player.size) / 2

        player.tileX = spawn.x
        player.tileY = spawn.y

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