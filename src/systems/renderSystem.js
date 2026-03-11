import {
    TILE_WALL,
    TILE_DESTRUCTIBLE
} from "../config/constants.js"
export class RenderSystem {

    draw(world, p) {

        const grid = world.grid
        const tileSize = world.tileSize

        p.stroke(60)
        p.noFill()

        for (let y = 0; y < grid.rows; y++) {
            for (let x = 0; x < grid.cols; x++) {

                const tile = grid.tiles[y][x]

                const px = x * tileSize
                const py = y * tileSize

                if (tile === TILE_WALL) {
                    p.fill(120)
                    p.rect(px, py, tileSize, tileSize)
                }

                else if (tile === TILE_DESTRUCTIBLE) {
                    p.fill(200, 150, 80)
                    p.rect(px, py, tileSize, tileSize)
                }

            }
        }

        for (const entity of world.entities) {
            if (!entity.size || entity.type !== "bomb") continue;
            p.fill(255, 80, 80);
            p.rect(entity.posX, entity.posY, entity.size, entity.size);
        }

        
        for (const entity of world.entities) {
            if (!entity.size || entity.type !== "explosion") continue;
            p.fill(255, 165, 0);
            p.rect(entity.posX, entity.posY, entity.size, entity.size);
        }
        
        for (const entity of world.entities) {
            if (!entity.size || entity.type !== "player") continue;
            p.fill(80, 200, 255);
            p.rect(entity.posX, entity.posY, entity.size, entity.size);
        }

    }

}