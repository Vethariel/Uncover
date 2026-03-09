export class MovementSystem {

  update(world, dt) {

    for (const entity of world.entities) {

      if (entity.vx === undefined) continue

      entity.x += entity.vx * dt
      entity.y += entity.vy * dt

    }

  }

}