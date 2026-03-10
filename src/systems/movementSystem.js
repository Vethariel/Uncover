import { DIR_NONE, DIR_DOWN, DIR_LEFT, DIR_RIGHT, DIR_UP } from "../config/constants.js";
export class MovementSystem {

    update(world, dt) {

        for (const entity of world.entities) {

            if (entity.vx === undefined) continue

            if (entity.facing === undefined) continue

            // Set velocity based on facing direction
            switch (entity.facing) {
                case DIR_UP:
                    entity.vy = -entity.speed;
                    entity.vx = 0;
                    break;
                case DIR_DOWN:
                    entity.vy = entity.speed;
                    entity.vx = 0;
                    break;
                case DIR_LEFT:
                    entity.vx = -entity.speed;
                    entity.vy = 0;
                    break;
                case DIR_RIGHT: // RIGHT
                    entity.vx = entity.speed;
                    entity.vy = 0;
                    break;
                case DIR_NONE:
                default:
                    entity.vx = 0;
                    entity.vy = 0;
                    break;
            }

            entity.x += entity.vx * dt
            entity.y += entity.vy * dt

        }

    }

}