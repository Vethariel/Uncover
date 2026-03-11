import {
    DIR_UP,
    DIR_DOWN,
    DIR_LEFT,
    DIR_RIGHT,
    DIR_NONE,
    TILE_WALL,
    TILE_DESTRUCTIBLE
} from "../config/constants.js"

export class CollisionSystem {

    update(world, dt) {

        const grid = world.grid
        const tileSize = world.tileSize

        for (const entity of world.entities) {

            if (!entity.size || entity.type !== "player") continue

            if (!entity.alive) continue

            if (entity.desiredFacing === DIR_NONE) continue

            const vec = this.vector(entity.desiredFacing)

            const newX = entity.posX + vec.x * entity.speed * dt
            const newY = entity.posY + vec.y * entity.speed * dt

            const newLeft = Math.floor(newX / tileSize)
            const newRight = Math.floor((newX + entity.size) / tileSize)
            const newTop = Math.floor(newY / tileSize)
            const newBottom = Math.floor((newY + entity.size) / tileSize)

            const sideLeftTop = this.blockedTile(world, grid, newLeft, newTop, entity)
            const sideLeftBottom = this.blockedTile(world, grid, newLeft, newBottom, entity)

            const sideRightTop = this.blockedTile(world, grid, newRight, newTop, entity)
            const sideRightBottom = this.blockedTile(world, grid, newRight, newBottom, entity)

            let collision = false

            switch (entity.desiredFacing) {
                case DIR_UP:
                    collision = sideLeftTop || sideRightTop
                    break
                case DIR_DOWN:
                    collision = sideLeftBottom || sideRightBottom
                    break
                case DIR_LEFT:
                    collision = sideLeftTop || sideLeftBottom
                    break
                case DIR_RIGHT:
                    collision = sideRightTop || sideRightBottom
                    break
            }


            if (collision) {

                switch (entity.desiredFacing) {
                    case DIR_UP:
                        if (sideLeftTop && !sideRightTop) {
                            entity.posX = entity.posX + entity.speed * dt
                        } else if (!sideLeftTop && sideRightTop) {
                            entity.posX = entity.posX - entity.speed * dt
                        }
                        break
                    case DIR_DOWN:
                        if (sideLeftBottom && !sideRightBottom) {
                            entity.posX = entity.posX + entity.speed * dt
                        } else if (!sideLeftBottom && sideRightBottom) {
                            entity.posX = entity.posX - entity.speed * dt
                        }
                        break
                    case DIR_LEFT:
                        if (sideLeftTop && !sideLeftBottom) {
                            entity.posY = entity.posY + entity.speed * dt
                        } else if (!sideLeftTop && sideLeftBottom) {
                            entity.posY = entity.posY - entity.speed * dt
                        }
                        break
                    case DIR_RIGHT:
                        if (sideRightTop && !sideRightBottom) {
                            entity.posY = entity.posY + entity.speed * dt
                        } else if (!sideRightTop && sideRightBottom) {
                            entity.posY = entity.posY - entity.speed * dt
                        }
                        break
                }

            } else {
                entity.posX = newX
                entity.posY = newY
            }

        }

    }

    vector(direction) {

        switch (direction) {
            case DIR_UP: return { x: 0, y: -1 }
            case DIR_DOWN: return { x: 0, y: 1 }
            case DIR_LEFT: return { x: -1, y: 0 }
            case DIR_RIGHT: return { x: 1, y: 0 }
            default: return { x: 0, y: 0 }
        }

    }

    solid(grid, x, y) {

        const tile = grid.get(x, y)

        return tile === TILE_WALL || tile === TILE_DESTRUCTIBLE

    }

    blockedTile(world, grid, x, y, entity) {

        if (this.solid(grid, x, y))
            return true

        if (this.bombSolid(world, x, y, entity))
            return true

        return false

    }

    bombSolid(world, x, y, entity) {

        const tileSize = world.tileSize

        for (const e of world.entities) {

            if (e.type !== "bomb") continue

            const bx = Math.floor(e.posX / tileSize)
            const by = Math.floor(e.posY / tileSize)

            if (bx === x && by === y) {

                if (e.passThrough && e.owner === entity)
                    return false

                return true
            }

        }

        return false

    }

}