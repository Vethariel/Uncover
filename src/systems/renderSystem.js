import { TILE_WALL, TILE_DESTRUCTIBLE } from "../config/constants.js"

const POWERUP_COLORS = {
    life:  [255, 100, 100],
    bomb:  [255, 80,  200],
    range: [100, 200, 255],
    speed: [100, 255, 150],
}

export class RenderSystem {

    draw(world, p) {
        this.drawTiles(world, p)
        this.drawEntities(world, p)
    }

    drawTiles(world, p) {

        const { grid, tileSize } = world

        p.stroke(60)
        p.strokeWeight(2)

        for (let y = 0; y < grid.rows; y++) {
            for (let x = 0; x < grid.cols; x++) {

                const tile = grid.tiles[y][x]

                if (tile === TILE_WALL) {
                    p.fill(120)
                } else if (tile === TILE_DESTRUCTIBLE) {
                    p.fill(200, 150, 80)
                } else {
                    continue
                }

                p.rect(Math.floor(x * tileSize), Math.floor(y * tileSize), tileSize, tileSize)

            }
        }

    }

    drawEntities(world, p) {

        p.noStroke()

        // Bombas
        p.fill(30, 255, 30)
        for (const bomb of world.bombs) {
            p.rect(bomb.posX, bomb.posY, bomb.size, bomb.size)
        }

        // Explosiones
        p.fill(255, 165, 0)
        for (const explosion of world.explosions) {
            p.rect(explosion.posX, explosion.posY, explosion.size, explosion.size)
        }

        // Power ups
        for (const powerUp of Object.values(world.powerUps ?? {})) {
            if (powerUp.alive === false) continue
            p.fill(...(POWERUP_COLORS[powerUp.kind] ?? [255, 255, 0]))
            p.rect(powerUp.posX, powerUp.posY, powerUp.size, powerUp.size)
        }

        // Portal
        if (world.portal) {
            p.fill(world.portal.active ? [120, 60, 200] : [60, 60, 60])
            if (world.portal.active) p.fill(120, 60, 200)
            else p.fill(60, 60, 60)
            p.rect(world.portal.posX, world.portal.posY, world.portal.size, world.portal.size)
        }

        // Enemigos
        p.fill(220, 60, 60)
        for (const enemy of world.enemies) {
            if (enemy.alive === false) continue
            p.rect(Math.floor(enemy.posX), Math.floor(enemy.posY), enemy.size, enemy.size)
        }

        // Jugador
        if (world.player?.alive) {
            p.fill(80, 200, 255)
            p.rect(Math.floor(world.player.posX), Math.floor(world.player.posY), world.player.size, world.player.size)
        }

    }

}