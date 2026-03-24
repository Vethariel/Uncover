import { TILE_WALL, TILE_DESTRUCTIBLE } from "../config/constants.js"

export class RenderSystem {

    draw(world, assets, p) {
        this.drawTiles(world, p)
        this.drawEntities(world, assets, p)
    }

    drawTiles(world, p) {

        const { grid, tileSize } = world

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

    drawEntities(world, assets, p) {

        p.noStroke()

        // Bombas
        for (const bomb of world.bombs) {
            this.drawSprite(p, assets, bomb)
        }

        // Explosiones
        for (const explosion of world.explosions) {
            this.drawSprite(p, assets, explosion)
        }

        // Power ups
        for (const powerUp of Object.values(world.powerUps ?? {})) {
            if (powerUp.alive === false) continue
            this.drawSprite(p, assets, powerUp)
        }

        // Portal
        if (world.portal) {
            p.fill(world.portal.active ? [120, 60, 200] : [60, 60, 60])
            if (world.portal.active) p.fill(120, 60, 200)
            else p.fill(60, 60, 60)
            p.rect(world.portal.posX, world.portal.posY, world.portal.size, world.portal.size)
        }

        // Enemigos
        for (const enemy of world.enemies) {
            this.drawSprite(p, assets, enemy)
        }

        // Jugador
        this.drawSprite(p, assets, world.player)

    }

    drawSprite(p, assets, entity) {

        const sprite = entity.sprite
        if (!sprite) return

        const sheet = assets.get(sprite.sheet)
        if (!sheet) return

        const anim = sprite.animations[sprite.current]
        if (!anim) return

        if (anim.loop === false && sprite.finished) return

        const sx = sprite.frame * sprite.frameWidth
        const sy = anim.row * sprite.frameHeight

        // Centra el sprite sobre la hitbox
        const drawX = Math.floor(entity.posX + (entity.size - sprite.frameWidth) / 2)
        const drawY = Math.floor(entity.posY + (entity.size - sprite.frameHeight))  // alineado al piso
        p.image(sheet, drawX, drawY, sprite.frameWidth, sprite.frameHeight,
            sx, sy, sprite.frameWidth, sprite.frameHeight)

    }

}