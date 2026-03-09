import { Game } from "./core/game.js"

let sketch = (p) => {

  let game

  p.setup = function () {

    p.createCanvas(800, 600)

    game = new Game()

  }

  p.draw = function () {

    const dt = p.deltaTime / 1000

    p.background(30)

    game.update(dt, p)

    game.render(p)

  }

}

new p5(sketch)