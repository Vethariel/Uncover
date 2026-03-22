import { TILE_WALL, TILE_DESTRUCTIBLE } from "../../config/constants.js"

// dangerHelper.js
export function isDangerous(world, tileX, tileY) {

    const ts = world.tileSize

    for (const explosion of world.explosions) {
        if (Math.floor(explosion.posX / ts) === tileX &&
            Math.floor(explosion.posY / ts) === tileY) return true
    }

    for (const bomb of world.bombs) {
        if (bomb.timer > 1.5) continue

        const bx = Math.floor(bomb.posX / ts)
        const by = Math.floor(bomb.posY / ts)
        const range = (bomb.owner?.bombRange ?? 3)

        if (bx === tileX && Math.abs(by - tileY) <= range) {
            if (lineOfSight(world, bx, by, tileX, tileY)) return true
        }

        if (by === tileY && Math.abs(bx - tileX) <= range) {
            if (lineOfSight(world, bx, by, tileX, tileY)) return true
        }

    }

    return false

}

function lineOfSight(world, fromX, fromY, toX, toY) {

    // Mismo tile
    if (fromX === toX && fromY === toY) return true

    const dx = Math.sign(toX - fromX)
    const dy = Math.sign(toY - fromY)
    let x = fromX + dx
    let y = fromY + dy

    while (x !== toX || y !== toY) {
        const tile = world.grid.get(x, y)
        if (tile === TILE_WALL || tile === TILE_DESTRUCTIBLE) return false
        x += dx
        y += dy
    }

    return true

}

export function isSafe(world, tileX, tileY) {
    const tile = world.grid.get(tileX, tileY)
    if (tile === TILE_WALL || tile === TILE_DESTRUCTIBLE) return false
    return !isDangerous(world, tileX, tileY)
}