export class RenderSystem {

  draw(world, p) {

    for (const entity of world.entities) {

      if (!entity.size) continue

      p.fill(80, 200, 255)
      p.rect(entity.x, entity.y, entity.size, entity.size)

    }

  }

}