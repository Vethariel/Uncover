import {
    DIR_UP, DIR_DOWN, DIR_LEFT, DIR_RIGHT, DIR_NONE,
    TILE_WALL, TILE_DESTRUCTIBLE
} from "../config/constants.js"

const ALL_DIRS = [DIR_UP, DIR_DOWN, DIR_LEFT, DIR_RIGHT]

const VECTORS = {
    [DIR_UP]: { x: 0, y: -1 },
    [DIR_DOWN]: { x: 0, y: 1 },
    [DIR_LEFT]: { x: -1, y: 0 },
    [DIR_RIGHT]: { x: 1, y: 0 },
}

export class EnemyAISystem {

    update(world, dt) {

        for (const entity of world.entities) {

            if (!entity.size || entity.type !== "enemy") continue
            if (!entity.alive) continue

            entity.thinkTimer -= dt

            if (entity.thinkTimer <= 0) {
                entity.thinkTimer = entity.thinkInterval
                entity.currentDirection = this.chooseDirection(world, entity)
                entity.desiredFacing = entity.currentDirection
            }

        }

    }

    // BFS hacia el jugador, máx 10 tiles de profundidad
    chooseDirection(world, enemy) {

        if (!world.player || !world.player.alive) {
            return this.randomDirection(world, enemy)
        }

        const ts = world.tileSize
        const startX = Math.floor((enemy.posX + enemy.size / 2) / ts)
        const startY = Math.floor((enemy.posY + enemy.size / 2) / ts)
        const goalX = Math.floor((world.player.posX + world.player.size / 2) / ts)
        const goalY = Math.floor((world.player.posY + world.player.size / 2) / ts)

        if (startX === goalX && startY === goalY) return enemy.currentDirection

        // BFS
        const queue = [{ x: startX, y: startY, firstDir: null }]
        const visited = new Set()
        visited.add(`${startX},${startY}`)

        while (queue.length > 0) {

            const { x, y, firstDir } = queue.shift()

            for (const dir of ALL_DIRS) {

                const v = VECTORS[dir]
                const nx = x + v.x
                const ny = y + v.y
                const key = `${nx},${ny}`

                if (visited.has(key)) continue
                visited.add(key)

                if (this.tileBlocked(world, nx, ny)) continue

                const nextFirstDir = firstDir ?? dir

                if (nx === goalX && ny === goalY) return nextFirstDir

                if (visited.size > 120) continue  // límite de profundidad

                queue.push({ x: nx, y: ny, firstDir: nextFirstDir })

            }

        }

        // Sin camino — movimiento aleatorio
        return this.randomDirection(world, enemy)

    }

    randomDirection(world, enemy) {

        const ts = world.tileSize

        const tileX = Math.floor((enemy.posX + enemy.size / 2) / ts)
        const tileY = Math.floor((enemy.posY + enemy.size / 2) / ts)

        const opposite = {
            [DIR_UP]: DIR_DOWN, [DIR_DOWN]: DIR_UP,
            [DIR_LEFT]: DIR_RIGHT, [DIR_RIGHT]: DIR_LEFT
        }

        const dirs = ALL_DIRS.filter(dir => {
            const nx = tileX + VECTORS[dir].x
            const ny = tileY + VECTORS[dir].y
            return !this.tileBlocked(world, nx, ny)
        })

        if (dirs.length === 0) return enemy.currentDirection

        const forward = dirs.filter(d => d !== opposite[enemy.currentDirection])
        const candidates = forward.length > 0 ? forward : dirs

        return candidates[Math.floor(Math.random() * candidates.length)]

    }

    tileBlocked(world, tileX, tileY) {

        const tile = world.grid.get(tileX, tileY)
        return tile === TILE_WALL || tile === TILE_DESTRUCTIBLE

    }

    isBlocked(world, newX, newY, enemy) {

        const ts = world.tileSize
        const s = enemy.size

        const left = Math.floor(newX / ts)
        const right = Math.floor((newX + s) / ts)
        const top = Math.floor(newY / ts)
        const bottom = Math.floor((newY + s) / ts)

        return (
            this.tileBlocked(world, left, top) ||
            this.tileBlocked(world, right, top) ||
            this.tileBlocked(world, left, bottom) ||
            this.tileBlocked(world, right, bottom)
        )

    }

}