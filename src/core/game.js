import { World } from "./world.js"
import { Player } from "../entities/player.js"

import { InputSystem } from "../systems/inputSystem.js"
import { MovementSystem } from "../systems/movementSystem.js"
import { RenderSystem } from "../systems/renderSystem.js"

export class Game {

  constructor() {

    this.world = new World()

    const player = new Player(200, 200)

    this.world.player = player
    this.world.entities.push(player)

    this.inputSystem = new InputSystem()
    this.movementSystem = new MovementSystem()
    this.renderSystem = new RenderSystem()

  }

  update(dt, p) {

    this.inputSystem.update(this.world, dt, p)
    this.movementSystem.update(this.world, dt)

  }

  render(p) {

    this.renderSystem.draw(this.world, p)

  }

}