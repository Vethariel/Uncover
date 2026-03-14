import { TILE_WALL, TILE_DESTRUCTIBLE } from "../config/constants.js"

const LAYER_ORDER = ["bomb", "explosion", "enemy", "player"]

const ENTITY_COLORS = {
    bomb: [30, 255, 30],
    explosion: [255, 165, 0],
    enemy: [220, 60, 60],
    player: [80, 200, 255],
}

export class RenderSystem {

    draw(world, p) {

        this.drawTiles(world, p)
        this.drawEntities(world, p)

        if (world.gameWon) this.drawGameWon(p)
        else if (world.gameOver) this.drawGameOver(p)

    }

    drawTiles(world, p) {

        const { grid, tileSize } = world

        p.stroke(60)

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

                p.rect(x * tileSize, y * tileSize, tileSize, tileSize)

            }
        }

    }

    drawEntities(world, p) {

        const layers = {}
        for (const type of LAYER_ORDER) layers[type] = []

        for (const entity of world.entities) {
            if (entity.size && layers[entity.type]) {
                layers[entity.type].push(entity)
            }
        }

        p.noStroke()

        for (const type of LAYER_ORDER) {
            const color = ENTITY_COLORS[type]
            p.fill(...color)

            for (const entity of layers[type]) {
                if (entity.alive === false) continue
                p.rect(entity.posX, entity.posY, entity.size, entity.size)
            }
        }

    }

    drawGameOver(p) {

        p.fill(0, 0, 0, 150)
        p.rect(0, 0, p.width, p.height)

        p.fill(255)
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(32)
        p.text("GAME OVER", p.width / 2, p.height / 2)

    }

    drawGameWon(p) {

        p.fill(0, 0, 0, 150)
        p.rect(0, 0, p.width, p.height)

        p.fill(255, 220, 0)
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(32)
        p.text("YOU WIN!", p.width / 2, p.height / 2)

    }

}