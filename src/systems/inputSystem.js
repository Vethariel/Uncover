import {
  DIR_UP,
  DIR_DOWN,
  DIR_LEFT,
  DIR_RIGHT,
  DIR_NONE
} from "../config/constants.js"

export class InputSystem {

  update(world, dt, p) {

    const player = world.player

    let direction = DIR_NONE

    if (p.keyIsDown('a')) direction = DIR_LEFT   // A
    else if (p.keyIsDown('d')) direction = DIR_RIGHT    // D
    else if (p.keyIsDown('w')) direction = DIR_UP   // W
    else if (p.keyIsDown('s')) direction = DIR_DOWN    // S

    player.facing = direction

  }

}