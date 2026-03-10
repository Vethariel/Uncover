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

            if (entity.desiredFacing === DIR_NONE) continue

            const vec = this.vector(entity.desiredFacing)

            const newX = entity.x + vec.x * entity.speed * dt
            const newY = entity.y + vec.y * entity.speed * dt
            
            const newLeft = Math.floor(newX / tileSize)
            const newRight = Math.floor((newX + entity.size) / tileSize)
            const newTop = Math.floor(newY / tileSize)
            const newBottom = Math.floor((newY + entity.size) / tileSize)

            const sideLeftTop = this.solid(grid, newLeft, newTop)
            const sideLeftBottom = this.solid(grid, newLeft, newBottom)

            const sideRightTop = this.solid(grid, newRight, newTop)
            const sideRightBottom = this.solid(grid, newRight, newBottom)


            if (sideLeftTop || sideLeftBottom || sideRightTop || sideRightBottom) {

                switch (entity.desiredFacing) {
                    case DIR_UP:
                        if (sideLeftTop && !sideRightTop) {
                            entity.x = entity.x + entity.speed * dt
                        } else if (!sideLeftTop && sideRightTop) {
                            entity.x = entity.x - entity.speed * dt
                        }
                        break
                    case DIR_DOWN:
                        if (sideLeftBottom && !sideRightBottom ) {
                            entity.x = entity.x + entity.speed * dt
                        } else if (!sideLeftBottom && sideRightBottom) {
                            entity.x = entity.x - entity.speed * dt
                        }
                        break
                    case DIR_LEFT:
                        if (sideLeftTop && !sideLeftBottom) {
                            entity.y = entity.y + entity.speed * dt
                        } else if (!sideLeftTop && sideLeftBottom) {
                            entity.y = entity.y - entity.speed * dt
                        }
                        break
                    case DIR_RIGHT:
                        if (sideRightTop && !sideRightBottom) {
                            entity.y = entity.y + entity.speed * dt
                        } else if (!sideRightTop && sideRightBottom) {
                            entity.y = entity.y - entity.speed * dt
                        }
                        break
                }
                
            } else {
                entity.x = newX
                entity.y = newY
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

}