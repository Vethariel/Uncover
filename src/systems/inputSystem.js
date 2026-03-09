export class InputSystem {

  update(world, dt, p) {

    const player = world.player

    player.vx = 0
    player.vy = 0

    if (p.keyIsDown('a')) player.vx = -player.speed   // A
    if (p.keyIsDown('d')) player.vx = player.speed    // D
    if (p.keyIsDown('w')) player.vy = -player.speed   // W
    if (p.keyIsDown('s')) player.vy = player.speed    // S

  }

}